import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  dateOfBirth: yup
    .date()
    .min(new Date(1900, 0, 1), "The year of birth can't be smaller than 1900")
    .max(new Date(2017, 0, 1), "The year of birth can't be greater than 2017")
    .required("Date of Birth is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default validationSchema;
