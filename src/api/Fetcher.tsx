import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import _ from "lodash";
import Config from "../config";
import store, {persistor} from "../redux/store";
import {showError} from "../utils/notification";
import ListErrorMessage from "./ErrorMessage/ListErrorMessage";
import {IAccountInfo} from "./User/ApiUser";
import perf, {FirebasePerformanceTypes} from "@react-native-firebase/perf";
import {isIOS} from "../utils/device";
import i18n from "i18next";
import DeviceInfo from "react-native-device-info";
import {loginUser, logoutUser} from "src/redux/slices/UserSlice";

export interface IDataError {
  errorCode: string;
  errorMessage?: string | object;
}

export interface IMetadata {
  time?: string;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize?: number;
}

export interface IDataWithMeta<T> {
  meta: IMetadata;
  data: T;
}

export interface IResponseDTO<T> {
  success: boolean;
  errorCode: string;
  message?: string;
  meta?: IMetadata;
  data?: T;
}

interface IResponseWithMetadataDTO<T> {
  success: boolean;
  errorCode: string;
  message?: string;
  meta: IMetadata;
  data?: T;
}

interface IFetcherOptions {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  displayError?: boolean;
}

function displayError(dataError: IDataError): void {
  try {
    const {errorCode} = dataError;
    let errorMessage;

    const error = ListErrorMessage.find((dt) => dt.error_code === errorCode);
    if (error) {
      errorMessage = error.description;
    } else {
      errorMessage = `Somethings Wrong ${errorCode}`;
      if (
        dataError.errorMessage &&
        typeof dataError.errorMessage !== "object"
      ) {
        errorMessage = dataError.errorMessage;
      }
      showError(errorMessage);
    }
  } catch (e) {
    showError(_.toString(e));
  }
}

function handleRefreshToken(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fetcher<IAccountInfo>(
      {
        url: "/auth/refresh-token",
        method: "post",
        data: {refreshToken: store.getState().user?.refreshToken},
      },
      {displayError: false}
    )
      .then((res) => {
        store.dispatch(loginUser(res));
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
}

export async function fetcher<T>(
  config: AxiosRequestConfig,
  options: IFetcherOptions = {}
): Promise<T> {
  // Check if fetcher have url and method
  if (!config.url || !config.method) {
    throw new Error("There are no URL or method for API");
  }

  const defaultOptions: IFetcherOptions = {
    withToken: Config.NETWORK_CONFIG.USE_TOKEN,
    withMetadata: Config.NETWORK_CONFIG.WITH_METADATA,
    displayError: Config.NETWORK_CONFIG.DISPLAY_ERROR,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
      "os": isIOS() ? "ios" : "android",
      "lang": i18n.resolvedLanguage,
      "device_type": DeviceInfo.getDeviceType(),
      "app_version": DeviceInfo.getVersion(),
    },
    baseURL: Config.NETWORK_CONFIG.API_BASE_URL,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
  });

  // Access Token
  if (defaultOptions.token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${defaultOptions.token}`;
  } else {
    if (defaultOptions.withToken) {
      const state = store.getState();
      const token = state.user?.access_token;
      if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    }
  }

  // Log request for performance check
  const httpMetric = perf().newHttpMetric(
    config.url,
    config.method.toUpperCase() as FirebasePerformanceTypes.HttpMethod
  );
  if (store.getState()?.user?.user?._id) {
    httpMetric.putAttribute(
      "userId",
      store.getState().user.user?._id as string
    );
  }
  await httpMetric.start();

  // log.debug(config);

  return new Promise<T>((resolve, reject) => {
    apiClient
      .request<T, AxiosResponse<IResponseDTO<T>>>(config)
      .then(async (response) => {
        // log.debug(response.data);

        httpMetric.setHttpResponseCode(response?.status ?? 222);
        httpMetric.setResponseContentType(
          response?.headers["content-type"] ?? null
        );
        // console.log(config.data);
        if (response.data.success) {
          if (response.data.data === undefined) {
            const dataEmpty: IDataError = {
              errorCode: "ERROR_EMPTY",
              errorMessage: "Data is empty",
            };
            if (defaultOptions.displayError) {
              displayError(dataEmpty);
            }
            httpMetric.putAttribute("errorCode", "ERROR???");
            httpMetric.putAttribute("errorMessage", "Data is empty");
            await httpMetric.stop();
            reject(dataEmpty);
            return;
          }
          await httpMetric.stop();
          resolve(response.data.data);
          return;
        }
        const dataError: IDataError = {
          errorCode: response.data.errorCode,
          errorMessage: response.data.message,
        };
        if (
          dataError.errorCode === "NEWS000102" ||
          dataError.errorCode === "JWT000201" ||
          dataError.errorCode === "AUTH000220"
        ) {
          // Dispatch Login
          store.dispatch(logoutUser());
          if (defaultOptions.displayError) {
            // TODO: Show dialog login
          }
        }

        if (dataError?.errorCode === "AUTH000221") {
          try {
            const checkRefresh = await handleRefreshToken();
            if (checkRefresh) {
              const data = await fetcher<T>(config, options);
              resolve(data);
            } else {
              httpMetric.putAttribute("errorCode", "AUTH000221");
              httpMetric.putAttribute(
                "errorMessage",
                "Can't refresh access token"
              );
              // confirmLogout();
              // Too many request refresh token cause the token invalid which will show this error
              // store.dispatch(UserAction.userLogout());
              // store.dispatch(RequiredAuthenticationAction.requiredLogin());
            }
            await httpMetric.stop();
            return;
          } catch (error) {
            // confirmLogout();
            store.dispatch(logoutUser());
            // TODO: Show dialog login
            httpMetric.putAttribute("errorCode", "AUTH000221");
            httpMetric.putAttribute(
              "errorMessage",
              "Something is wrong after refresh access token"
            );
            await httpMetric.stop();
            return;
          }
        }

        if (dataError?.errorMessage === "AUTH000220") {
          // confirmLogout();
          httpMetric.putAttribute("errorCode", "AUTH000220");
          httpMetric.putAttribute("errorMessage", "Refresh token is expired");
          await httpMetric.stop();
          return;
        }

        if (defaultOptions.displayError) {
          displayError(dataError);
        }

        httpMetric.putAttribute("errorCode", dataError.errorCode);
        httpMetric.putAttribute(
          "errorMessage",
          _.toString(dataError.errorMessage).substring(0, 100)
        );
        await httpMetric.stop();
        reject(dataError);
      })
      .catch(async (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error
          const somethingsWrong: IDataError = {
            errorCode: "ERROR???",
            errorMessage: "Somethings Wrong",
          };

          const dataError: IDataError =
            error?.response?.data ?? somethingsWrong;

          if (dataError?.errorCode === "AUTH3001.NotAuthenticated") {
            persistor.purge();
          } else {
            if (defaultOptions.displayError) {
              displayError(dataError);
            }
          }
          httpMetric.putAttribute("errorCode", dataError.errorCode);
          httpMetric.putAttribute(
            "errorMessage",
            _.toString(dataError.errorMessage).substring(0, 100)
          );
          httpMetric.setHttpResponseCode(error.response?.status ?? 888);
          httpMetric.setResponseContentType(
            error.response?.headers["content-type"] ?? null
          );
        } else {
          // Native error
          httpMetric.putAttribute("errorCode", "NATIVE");
          httpMetric.putAttribute(
            "errorMessage",
            _.toString(error).substring(0, 100)
          );
          httpMetric.setHttpResponseCode(999);
          httpMetric.setResponseContentType(null);
          showError(_.toString(error));
        }

        await httpMetric.stop();
        return reject(error);
      });
  });
}

export async function fetcherWithMetadata<T>(
  config: AxiosRequestConfig,
  options: IFetcherOptions = {}
): Promise<{data: T; meta: IMetadata}> {
  // Check if fetcher have url and method
  if (!config.url || !config.method) {
    throw new Error("There are no URL or method for API");
  }

  const defaultOptions: IFetcherOptions = {
    withToken: Config.NETWORK_CONFIG.USE_TOKEN,
    withMetadata: true,
    displayError: Config.NETWORK_CONFIG.DISPLAY_ERROR,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
      "os": isIOS() ? "ios" : "android",
      "lang": i18n.resolvedLanguage,
      "device_type": DeviceInfo.getDeviceType(),
      "app_version": DeviceInfo.getVersion(),
    },
    baseURL: Config.NETWORK_CONFIG.API_BASE_URL,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
  });

  // Access Token
  if (defaultOptions.withToken) {
    const state = store.getState();
    const token = state.user?.access_token;
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  // Log request for performance check
  const httpMetric = perf().newHttpMetric(
    config.url,
    config.method.toUpperCase() as FirebasePerformanceTypes.HttpMethod
  );
  // TODO Set user id attribute
  // if (store.getState()?.user?.user?._id) {
  //   httpMetric.putAttribute(
  //     "userId",
  //     store.getState().user.user?._id as string
  //   );
  // }
  await httpMetric.start();

  // log.debug(config);

  return new Promise<{data: T; meta: IMetadata}>((resolve, reject) => {
    apiClient
      .request<T, AxiosResponse<IResponseWithMetadataDTO<T>>>(config)
      .then(async (response) => {
        // log.debug(response.data);
        httpMetric.setHttpResponseCode(response?.status ?? 222);
        httpMetric.setResponseContentType(
          response?.headers["content-type"] ?? null
        );
        if (response.data.success) {
          if (response.data.data === undefined) {
            const dataEmpty: IDataError = {
              errorCode: "ERROR???",
              errorMessage: "Data is empty",
            };
            if (defaultOptions.displayError) {
              displayError(dataEmpty);
            }
            httpMetric.putAttribute("errorCode", "ERROR???");
            httpMetric.putAttribute("errorMessage", "Data is empty");
            await httpMetric.stop();
            reject(dataEmpty);
            return;
          }
          await httpMetric.stop();
          resolve({
            data: response.data.data,
            meta: response.data.meta,
          });
          return;
        }
        const dataError: IDataError = {
          errorCode: response.data.errorCode,
          errorMessage: response.data.message,
        };
        if (
          dataError.errorCode === "NEWS000102" ||
          dataError.errorCode === "JWT000201" ||
          dataError.errorCode === "AUTH000220"
        ) {
          // Dispatch Login
          store.dispatch(logoutUser());
          // TODO: Show dialog login
        }

        if (dataError?.errorCode === "AUTH000221") {
          try {
            const checkRefresh = await handleRefreshToken();
            if (checkRefresh) {
              const data = await fetcherWithMetadata<T>(config, options);
              resolve({
                data: data.data,
                meta: data.meta,
              });
            } else {
              httpMetric.putAttribute("errorCode", "AUTH000221");
              httpMetric.putAttribute(
                "errorMessage",
                "Can't refresh access token"
              );
              // store.dispatch(UserAction.userLogout());
              // store.dispatch(RequiredAuthenticationAction.requiredLogin());
            }
            await httpMetric.stop();
            return;
          } catch (error) {
            // confirmLogout();
            store.dispatch(logoutUser());
            // TODO: Show dialog login
            httpMetric.putAttribute("errorCode", "AUTH000221");
            httpMetric.putAttribute(
              "errorMessage",
              "Something is wrong after refresh access token"
            );
            await httpMetric.stop();
            return;
          }
        }

        if (dataError?.errorMessage === "AUTH000220") {
          // confirmLogout();
          store.dispatch(logoutUser());
          // TODO: Show dialog login
          httpMetric.putAttribute("errorCode", "AUTH000220");
          httpMetric.putAttribute("errorMessage", "Refresh token is expired");
          await httpMetric.stop();
          return;
        }

        if (defaultOptions.displayError) {
          displayError(dataError);
        }

        httpMetric.putAttribute("errorCode", dataError.errorCode);
        httpMetric.putAttribute(
          "errorMessage",
          _.toString(dataError.errorMessage).substring(0, 100)
        );
        await httpMetric.stop();
        reject(dataError);
      })
      .catch(async (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          // Axios error
          const somethingsWrong: IDataError = {
            errorCode: "ERROR???",
            errorMessage: "Somethings Wrong",
          };

          const dataError: IDataError =
            error?.response?.data ?? somethingsWrong;

          if (dataError?.errorCode === "AUTH3001.NotAuthenticated") {
            persistor.purge();
          } else {
            if (defaultOptions.displayError) {
              displayError(dataError);
            }
          }

          httpMetric.putAttribute("errorCode", dataError.errorCode);
          httpMetric.putAttribute(
            "errorMessage",
            _.toString(dataError.errorMessage).substring(0, 100)
          );
          httpMetric.setHttpResponseCode(error.response?.status ?? 888);
          httpMetric.setResponseContentType(
            error.response?.headers["content-type"] ?? null
          );
        } else {
          // Native error
          httpMetric.putAttribute("errorCode", "NATIVE");
          httpMetric.putAttribute(
            "errorMessage",
            _.toString(error).substring(0, 100)
          );
          httpMetric.setHttpResponseCode(999);
          httpMetric.setResponseContentType(null);
          showError(_.toString(error));
        }

        await httpMetric.stop();
        return reject(error);
      });
  });
}
