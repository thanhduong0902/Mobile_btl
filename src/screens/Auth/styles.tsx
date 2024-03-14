import {Dimensions, StyleSheet} from "react-native";
import {isIphoneX} from "react-native-iphone-x-helper";
import {isIOS} from "src/utils/device";
import Config from "src/config";

const {height} = Dimensions.get("window");

const {
  LIGHT_SECONDARY_1,
  NEUTRALS_5,
  NEUTRALS_6,
  NEUTRALS_4,
  APPLE_ICON,
  FACEBOOK_ICON,
  GOOGLE_ICON,
  LINKEDIN_ICON,
  TWITTER_ICON,
  WHITE,
  BLUE,
} = Config.COLOR_CONFIG;

export const styles = StyleSheet.create({
  interacitem: {
    paddingHorizontal: 5,
  },
  formContainer: {
    justifyContent: "space-between",
    height: height - 30,
  },
  LogInLink: {
    color: LIGHT_SECONDARY_1,
    fontWeight: "700",
    fontSize: 17,
    marginTop: 1,
  },
  titleSubmit: {
    fontWeight: "500",
    fontSize: 19,
  },
  iconBack: {
    color: NEUTRALS_4,
    fontSize: 30,
    padding: 5,
  },
  LogInTitle: {
    color: APPLE_ICON,
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  buttonStyleApple: {
    backgroundColor: APPLE_ICON,
    borderRadius: 50,
    cursor: "pointer",
    height: 48,
    width: 48,
    marginLeft: 20,
  },
  buttonStyleFacebook: {
    backgroundColor: FACEBOOK_ICON,
    borderRadius: 50,
    height: 48,
    marginRight: 20,
    width: 48,
  },
  buttonStyleGoogle: {
    backgroundColor: GOOGLE_ICON,
    borderRadius: 50,
    height: 48,
    width: 48,
  },
  buttonStyleLinkIn: {
    backgroundColor: LINKEDIN_ICON,
    borderRadius: 50,
    height: 48,
    marginRight: 22,
    width: 48,
  },
  buttonStyleTwitter: {
    backgroundColor: TWITTER_ICON,
    borderRadius: 50,
    height: 48,
    marginRight: isIOS() ? 22 : 44,
    width: 48,
  },
  forgotPasswordWrapper: {
    flexDirection: "column",
    marginTop: 30,
  },
  forgotPassword: {
    borderColor: NEUTRALS_6,
    color: LIGHT_SECONDARY_1,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: -30,
  },
  buttonArea: {
    alignSelf: "flex-start",
  },
  employerContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  switchEmployer: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    marginLeft: 10,
  },
  textEmployer: {
    color: NEUTRALS_4,
    fontSize: 16,
    fontWeight: "400",
  },
  line: {
    backgroundColor: NEUTRALS_6,
    height: 1,
    marginTop: 30,
    width: "100%",
  },
  haveAccountText: {
    color: APPLE_ICON,
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    borderColor: NEUTRALS_6,
    borderRadius: 12,
    borderWidth: 2,
    color: NEUTRALS_4,
    height: 48,
    paddingHorizontal: 16,
  },

  inputContainer: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderColor: NEUTRALS_6,
    borderRadius: 12,
    borderWidth: 2,
    color: NEUTRALS_4,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
    width: "100%",
  },
  inputField: {
    color: NEUTRALS_4,
    height: 48,
    width: "95%",
  },
  labelInput: {
    color: NEUTRALS_5,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 10,
    marginTop: 30,
    textTransform: "uppercase",
  },
  logInButton: {
    backgroundColor: BLUE,
    borderRadius: 8,
    height: 48,
    marginVertical: 30,
  },
  loginContainer: {
    paddingHorizontal: 16,
  },
  logo: {
    height: 50,
    resizeMode: "contain",
  },
  logoContain: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  noAccountText: {
    color: APPLE_ICON,
    fontSize: 18,
    fontWeight: "700",
  },
  openIdLogin: {
    marginBottom: 20,
    color: NEUTRALS_5,
  },
  questionAccount: {
    flexDirection: "row",
    marginVertical: 10,
  },

  signUpLink: {
    color: LIGHT_SECONDARY_1,
    fontSize: 18,
    fontWeight: "700",
  },
  signInTitle: {
    marginTop: 15,
    marginBottom: 4,
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
  },
  signInTitleEmployer: {
    marginBottom: 15,
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "lowercase",
  },
  loginSocialWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isIphoneX() ? 0 : 40,
  },
  socialIcon: {
    color: WHITE,
  },
  socialLogin: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  footerContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
    marginTop: 30,
  },
});
