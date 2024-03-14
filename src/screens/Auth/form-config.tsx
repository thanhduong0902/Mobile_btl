import * as Yup from "yup";
import {Schema} from "yup";

export interface ILoginForm {
  username: string;
  password: string;
}

export function getValidationSchema(): Schema<ILoginForm> {
  return Yup.object().shape({
    username: Yup.string()
      .max(255, "common_validation.email_longer")
      .required("common_validation.email_empty"),
    password: Yup.string()
      .min(8, "common_validation.pass_shorter")
      .max(50, "common_validation.pass_longer")
      .required("common_validation.pass_empty"),
  });
}
