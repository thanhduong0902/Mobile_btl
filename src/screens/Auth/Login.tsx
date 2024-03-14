import React, {ReactElement} from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import {Button} from "react-native-elements";
import {Formik} from "formik";
import {useNavigation} from "@react-navigation/native";
import {useMutation} from "react-query";
import ApiUser, {ILoginBody} from "../../api/User/ApiUser";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import GestureHandleBack from "../../components/GestureHandleBack";
import {ScrollView} from "react-native-gesture-handler";
import {isIOS} from "../../utils/device";
import {isIphoneX} from "react-native-iphone-x-helper";
import {storage} from "../../storage";
import TextGlobal from "../../components/TextGlobal";
import {getValidationSchema} from "src/screens/Auth/form-config";
import {loginUser} from "src/redux/slices/UserSlice";
import {styles} from "src/screens/Auth/styles";

const {height} = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight;

export default function Login(): ReactElement {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const loginMutation = useMutation(ApiUser.login);

  const handleLogin = async (value: ILoginBody): Promise<void> => {
    const deviceToken = storage.getString("@device_token");
    await loginMutation.mutate(
      {
        username: value.username.trim(),
        password: value.password.trim(),
        role: 1,
        device: isIOS() ? "ios" : "adr",
        device_token: deviceToken,
      },
      {
        onSuccess: (res) => {
          dispatch(loginUser(res));
          navigation.goBack();
        },
      }
    );
  };

  const openPageSignUp = (): void => {};

  return (
    <GestureHandleBack style={{flex: 1}}>
      <ScrollView style={{...styles.loginContainer}}>
        <View
          style={
            statusBarHeight
              ? {minHeight: height - statusBarHeight}
              : {minHeight: height}
          }
        >
          <Formik
            initialValues={{username: "", password: ""}}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={getValidationSchema()}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
            }): ReactElement => (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={styles.logoContainer}>
                    <Image
                      style={styles.logo}
                      source={require("../../assets/logo/Logo_mini.png")}
                    />
                    <View style={styles.questionAccount}>
                      <TextGlobal style={styles.haveAccountText}>
                        {t("auth.not_account")}
                      </TextGlobal>
                      <TouchableOpacity onPress={openPageSignUp}>
                        <TextGlobal style={styles.LogInLink}>
                          {t("auth.sign_up")}
                        </TextGlobal>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TextGlobal style={styles.signInTitle}>
                    {t("auth.log_in")}
                  </TextGlobal>
                  <KeyboardAvoidingView
                    keyboardVerticalOffset={isIphoneX() ? 40 : 20}
                    behavior={isIOS() ? "padding" : "height"}
                    style={{flex: 1}}
                  >
                    <View>
                      {/* <TextInputGlobal
                        label="auth.username"
                        placeholder="auth.username"
                        value={values.username}
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        maxLength={100}
                      />

                      <TextInputGlobal
                        onSubmitEditing={(): void => {
                          handleSubmit();
                        }}
                        label="auth.password"
                        placeholder={t("auth.password")}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        isPassword
                      /> */}
                    </View>
                  </KeyboardAvoidingView>

                  <View style={styles.forgotPasswordWrapper}>
                    <TouchableOpacity style={styles.buttonArea}>
                      <TextGlobal style={styles.forgotPassword}>
                        {t("auth.forgot_password")}
                      </TextGlobal>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </View>
                  <Button
                    buttonStyle={styles.logInButton}
                    title="Login"
                    titleStyle={styles.titleSubmit}
                    loading={loginMutation.isLoading}
                    onPress={(): void => {
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </GestureHandleBack>
  );
}
