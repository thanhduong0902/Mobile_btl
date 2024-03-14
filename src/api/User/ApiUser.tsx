import {fetcher} from "../Fetcher";
import store from "../../redux/store";
import axios, {AxiosResponse} from "axios";
import Config from "../../config";

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
  token: string;
  role: number;
}

export interface ILoginBody {
  username: string;
  password: string;
  role?: number;
  device?: string;
  device_token?: string;
}

interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

interface IResetPassword {
  token: string;
  email: string;
  newPassword: string;
}

export interface IProfile {
  data?: {
    username?: string;
    firstName: string;
    email: string;
    address: string;
    phone: string;
    avatar_user: string;
    dateOfBirth: string;
    sex: string;
    city: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    education_id: string | number;
    korean_level_id: string | number;
    salary_id: string | number;
    skill_group_id: string | number;
    skill_id: string | number;
    work_experience_id: string | number;
    work_place: string | number;
  };
}

export interface ISettingId {
  _id?: string;
  themes?: string;
  location?: string;
  region?: string;
  language?: string;
  referCode?: string;
}
export enum IAccountRole {
  USER = 0,
  ADMIN = 1,
  ANONYMOUS = 2,
}
export interface IUserLogin {
  _id?: string;
  username?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  facebook?: string;
  role?: IAccountRole;
  interactionId?: string;
  settingId?: ISettingId;
  hasPassword?: boolean;
}
// interface IProfileBody {
//   firstName: string;
//   lastName: string;
//   bio?: string;
//   location?: string;
//   website?: string;
//   facebook?: string;
//   twitter?: string;
// }

export interface IUserFollowedItem {
  _id: string;
  username: string;
  avatar: string;
  totalFollowers: number;
}
export interface IInfoRecordItem {
  _id: string;
  username: string;
  bio?: string;
  avatar: string;
  isFollow: boolean;
}

export interface IUserFollowBody {
  followed: string | undefined;
  isFollow: boolean | undefined;
}

interface ILoginFirebaseBody {
  anonId: string;
  appType: string;
  idToken: string;
}

export interface IData {
  id: number;
  name: string | null;
}

export interface IDataVi {
  id: number;
  name_vi: string | null;
}

export interface IProfileEdit {
  username?: string;
  firstName?: string;
  email?: string;
  sex?: number;
  address?: string;
  phone?: string;
  avatar_user?: string;
  dateOfBirth?: string;
  city?: number;
  district?: number;
  education_id?: number;
  korean_level_id?: number;
  salary_id?: number;
  skill_group_id?: number;
  skill_id?: number[];
  work_experience_id?: number;
  work_place?: number[];
  allCity?: any;
  lat?: number;
  long?: number;
}

export interface IAccountInfo {
  user?: IUserLogin;
  refreshToken?: string;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  username?: string | null;
  update_employer?: boolean;
  url?: string;
  device_token?: string;
}

export interface IChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IProfilePersonal {
  data: {
    is_learning?: number;
    firstName: string;
    dateOfBirth: string;
    sex: number;
    phone: string;
    allSex?: IData[] | IDataVi[];
    email: string;
  };
}

export interface IDataProfile {
  data: {
    is_learning?: number;
    firstName?: string;
    dateOfBirth?: string;
    sex?: number;
    phone?: string;
    city?: number;
    district?: number;
    address?: string;
    email?: string;
    salary_id?: number;
    skill_group_id?: number;
    work_experience_id?: number;
    korean_level_id?: number;
    education_id?: number;
    skill_id?: number[] | [];
    work_place?: number[] | [];
    avatar_user?: string;
    allCity?: IData[];
    allDistrict?: IData[];
    allSalary?: IData[] | IDataVi[];
    allSkillGr?: IData[] | IDataVi[];
    allkorean?: IData[] | IDataVi[];
    allEdu?: IData[] | IDataVi[];
    allskill?: IData[] | IDataVi[];
    allSex?: IData[] | IDataVi[];
    allExp?: IData[] | IDataVi[];
    default?: {
      default_city?: IData | IDataVi;
      default_district?: IData | IDataVi;
      default_korean?: IData | IDataVi;
      default_skillGr?: IData | IDataVi;
      defaul_exp?: IData | IDataVi;
      default_salary?: IData | IDataVi;
      default_skill?: IData[] | IDataVi[];
      default_workplace?: IData[] | IDataVi[];
    };
  };
}

export interface ILoginSocialBody {
  idToken: string;
  device: string;
  device_token: string | null;
  access_token?: string;
}

export interface ISkillGr {
  data: {
    SkillGroup: IData[];
    company_size: IData[];
    active_types: IData[];
  };
}

export interface IRegisterEmployer {
  role?: number;
  username?: string;
  email?: string;
  password?: string;
  company_name: string;
  skill_group_id: number;
  address?: string;
  firstname: string;
  phone: string;
  token?: string;
}

export interface IUpdateEmployer {
  tax: string;
  company_size_id?: number | null;
  active_type_id?: number | null;
  url_website?: string;
}

export interface INotification {
  id: number;
  jinoboard_contents_id: number;
  type: string;
  job_id?: number;
  view?: number;
  timemodified: number;
  title?: string;
  applicant_name?: string;
  image_url?: string;
  company_name?: string;
  com_id?: number;
  content?: string;
  job_name?: string;
  firstname?: string;
  isSave?: boolean | undefined;
  user_id?: number;
  cv_id?: number;
}

export interface IDetailNotification {
  data: INotification;
}

export interface IListNotification {
  data: {
    total: number;
    currentPage: string;
    from: number;
    to: number;
    last_page: number;
    data: INotification[];
    unview: number;
  };
}

export interface IReport {
  review_id: number;
  firstname: string;
  content: string;
  company_name: string;
  timecreated: number;
  avatar?: string;
  rate: number;
}

export interface IListReport {
  data: {
    data: IReport[];
  };
  current_page: number;
  last_page: number;
}

const path = {
  register: "/auth/register",
  existEmail: "/auth/exist",
  login: "/auth/login",
  delete: "/user/delete",
  profile: "/auth/get-profile",
  confirmOtp: "auth/verify-otp",
  sendOtp: "auth/verify-email",
  forgotPassword: "/auth/forgot-password",
  forgotPasswordOtp: "/auth/confirm-token-forgot",
  resetPassword: "/auth/reset-password",
  refreshOtp: "auth/refresh-otp",
  changePassword: "/users/change-password",
  userFollowed: "/user/follow",
  getInfoRecord: "user/check-follow",
  userFollowing: "/user/follow",
  loginFirebase: "/auth/login-firebase",
  updateProfile: "/auth/update-profile",
  getProfile: "/auth/get-profile",
  baseStyle: "/static/style-app.json",
  loginAnonymous: "/auth/login-anon",
  changeUserPassWord: "/auth/change-user-password",
  logout: "logout",
  loginSocial: "/auth/login/",
  getDistrict: "/get-district",
  getAccount: "/users/account",
  editProfileFavorite: "/auth/create-profile-favorit",
  getProfileFavorite: "/auth/get-profile-favorit",
  getProfilePersonal: "/auth/get-profile-personal",
  editProfilePersonal: "/auth/create-profile",
  verifyEmailEmployer: "/auth/employer/verify-email",
  registerEmployer: "/auth/employer/register",
  getSkillGr: "/get-skillGr",
  updateEmployer: "/auth/employer/update-profile",
  checkMail: "/auth/check-mail",
  getListNotification: "/notification-get-list",
  readAllNotification: "/notification-seen-all",
  notificationDetail: "/notification-detail",
  getCity: "/get-city",
  getReport: "/auth/get-review-by-user",
  postReport: "/auth/report",
  infoAdmin: "/admin",
};

function getAdmin(): Promise<{data: {phone: number}}> {
  return fetcher({url: path.infoAdmin, method: "get"});
}

function postReport(body: number): Promise<never> {
  return fetcher({
    url: path.postReport,
    method: "post",
    data: {
      review_id: body,
    },
  });
}

function getReport(page?: number): Promise<IListReport> {
  return fetcher({
    url: path.getReport,
    method: "get",
    params: {
      page: page,
    },
  });
}

function getCity(): Promise<{data: IData[]}> {
  return fetcher({url: path.getCity, method: "get"});
}

function notificationDetail(params: {
  notification_id: number;
}): Promise<IDetailNotification> {
  return fetcher({url: path.notificationDetail, method: "get", params: params});
}

function readAllNotification(body: string): Promise<never> {
  return fetcher({url: path.readAllNotification, method: "post"});
}

function getListNotification(params: {
  page: number;
  unview: number;
}): Promise<IListNotification> {
  return fetcher({
    url: path.getListNotification,
    method: "get",
    params: params,
  });
}

function checkMail(body: {email: string; username: string}): Promise<never> {
  return fetcher({url: path.checkMail, method: "post", data: body});
}

function updateEmployer(body: IUpdateEmployer): Promise<never> {
  return fetcher({url: path.updateEmployer, method: "post", data: body});
}

function registerEmployer(body: IRegisterEmployer): Promise<never> {
  return fetcher({url: path.registerEmployer, method: "post", data: body});
}

function verifyEmailEmployer(body: IRegisterEmployer): Promise<never> {
  return fetcher({url: path.verifyEmailEmployer, method: "post", data: body});
}

function getSkillGr(): Promise<ISkillGr> {
  return fetcher({url: path.getSkillGr, method: "get"});
}

function getProfile(): Promise<IDataProfile> {
  return fetcher({url: path.profile, method: "get"}, {displayError: false});
}

function editProfileFavorite(body: IProfileEdit): Promise<IDataProfile> {
  return fetcher({url: path.editProfileFavorite, method: "post", data: body});
}

function getProfileFavorite(): Promise<IDataProfile> {
  return fetcher({url: path.getProfileFavorite, method: "get"});
}

function getProfilePersonal(): Promise<IProfilePersonal> {
  return fetcher({url: path.getProfilePersonal, method: "get"});
}

function getAccount(): Promise<never> {
  return fetcher({url: path.getAccount, method: "get"});
}

function getDistrict(body: {province_id: number}): Promise<never> {
  return fetcher({url: path.getDistrict, method: "post", data: body});
}

function logout(params: {
  device: string;
  device_token?: string;
}): Promise<never> {
  return fetcher(
    {url: path.logout, method: "get", params: params},
    {displayError: false}
  );
}

function editProfile(body: IProfileEdit): Promise<never> {
  return fetcher({url: path.updateProfile, method: "post", data: body});
}

function getDataProfile(): Promise<IDataProfile> {
  return fetcher({url: path.getProfile, method: "get"}, {displayError: false});
}

function register(body: IRegisterBody): Promise<never> {
  return fetcher({url: path.register, method: "post", data: body});
}
function sendOtp(body: {
  username: string;
  email: string;
  password: string;
  role: number;
}): Promise<never> {
  return fetcher({url: path.sendOtp, method: "post", data: body});
}

function login(body: ILoginBody): Promise<IUserLogin> {
  return fetcher({url: path.login, method: "post", data: body});
}

function loginSocial(data: {
  type: string;
  body: ILoginSocialBody;
}): Promise<IAccountInfo> {
  return fetcher({
    url: path.loginSocial + data.type,
    method: "post",
    data: data.body,
  });
}

function checkEmailExisted(email: string): Promise<never> {
  return fetcher({url: path.existEmail, method: "post", data: {email}});
}
function refreshOtp({
  email,
  typeOtp,
}: {
  email: string;
  typeOtp: number;
}): Promise<never> {
  return fetcher({
    url: path.refreshOtp,
    method: "post",
    data: {email, typeOtp},
  });
}
function forgotPassword(data: {email: string; role: number}): Promise<never> {
  return fetcher({url: path.forgotPassword, method: "post", data: data});
}

function resetPassword(body: IResetPassword): Promise<never> {
  return fetcher({url: path.resetPassword, method: "post", data: body});
}

function forgotPasswordOtp(body: {
  email: string;
  role: number;
  token: string;
}): Promise<never> {
  return fetcher({url: path.forgotPasswordOtp, method: "post", data: body});
}

function changePassword(body: IChangePasswordBody): Promise<never> {
  return fetcher({url: path.changePassword, method: "post", data: body});
}
function changeUserPassword(body: IChangeUserPassword): Promise<never> {
  return fetcher({url: path.changeUserPassWord, method: "post", data: body});
}

function isLogin(): boolean {
  return !!getAuthToken();
}

function confirmOtp({
  email,
  code,
  typeOtp,
}: {
  email: string;
  code: string;
  typeOtp: number;
}): Promise<never> {
  return fetcher({
    url: path.confirmOtp,
    method: "post",
    data: {email, code, typeOtp},
  });
}

function getInfoRecord(username: string | undefined): Promise<IInfoRecordItem> {
  return fetcher(
    {url: `${path.getInfoRecord}/${username}`, method: "get"},
    {displayError: false}
  );
}

function userFollowing(body: IUserFollowBody): Promise<never> {
  return fetcher(
    {url: path.userFollowing, method: "post", data: body},
    {displayError: false}
  );
}

function loginFirebase(body: ILoginFirebaseBody): Promise<never> {
  return fetcher({url: path.loginFirebase, method: "post", data: body});
}

function getAuthToken(): string | undefined {
  const {user} = store.getState();
  // TODO Replace with token
  return user?.access_token;
}

function getAppStyle(): Promise<AxiosResponse<object>> {
  return axios.get<object>(path.baseStyle, {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: Config.NETWORK_CONFIG.HOST,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
  });
}

function getGeoCode(input: string): Promise<any> {
  return fetcher({
    url: "https://rsapi.goong.io/Place/AutoComplete",
    method: "get",
    params: {
      api_key: Config.GGMAP_API_CONFIG.apiKey,
      input: input,
    },
  });
}

export default {
  register,
  login,
  loginSocial,
  isLogin,
  getAuthToken,
  confirmOtp,
  getProfile,
  editProfile,
  checkEmailExisted,
  sendOtp,
  forgotPassword,
  refreshOtp,
  changePassword,
  getInfoRecord,
  userFollowing,
  loginFirebase,
  getAppStyle,
  // loginAnonymous,
  changeUserPassword,
  getDataProfile,
  logout,
  forgotPasswordOtp,
  resetPassword,
  getDistrict,
  getAccount,
  getGeoCode,
  editProfileFavorite,
  getProfileFavorite,
  getProfilePersonal,
  getSkillGr,
  registerEmployer,
  verifyEmailEmployer,
  updateEmployer,
  checkMail,
  getListNotification,
  readAllNotification,
  notificationDetail,
  getCity,
  getReport,
  postReport,
  getAdmin,
};
