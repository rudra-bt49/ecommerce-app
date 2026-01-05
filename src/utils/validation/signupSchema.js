import * as Yup from "yup";
import {
  USERNAME_REGEX,
  EMAIL_DOMAIN_REGEX,
  PASSWORD_REGEX,
} from "../regex/regex";

export const signupSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Minimum 6 characters")
    .matches(
      USERNAME_REGEX,
      "Must contain letter, number & special character"
    ),

  email: Yup.string()
    .required("Email is required")
    .matches(
      EMAIL_DOMAIN_REGEX,
      "Only bitonmtree.com or ddu.com allowed"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .matches(
      PASSWORD_REGEX,
      "Must contain capital letter, number & special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
