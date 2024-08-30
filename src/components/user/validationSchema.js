import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .matches(
      /^[A-Z][a-zA-Z0-9'_]{2,30}$/,
      "First Name must start with an uppercase letter and contain only letters, hyphens, or apostrophes and Minimum 3 letters"
    )
    .required("Enter user Name!!"),
  day: Yup.number()
    .min(1, "Invalid day")
    .max(31, "Invalid day")
    .required("Day is required"),
  month: Yup.number()
    .min(1, "Invalid month")
    .max(12, "Invalid month")
    .required("Month is required"),
  year: Yup.number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year")
    .required("Year is required"),

  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character,_ and - should not allowed"
    )
    .required("Enter Password !!"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Password doesn't match, Enter same passsword"
    )
    .required("Please Enter the confirm password"),
});
export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Enter Password !!"),
});
export const forgetPasswordvalidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
});
export const resetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Enter Password !!"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password doesn't match, Enter same passsword"
    )
    .required("Please Enter the confirm password"),
});
