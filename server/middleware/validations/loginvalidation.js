import * as yup from "yup";

export const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .required("Password is required"),
  });

  try {
    await validationSchema.validate({ email, password }, { abortEarly: false });

    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errObj = {};

      error.inner.forEach((err) => {
        errObj[err.path] = err.message;
      });

      res.json({
        status: "FAILED",
        errors: errObj,
      });
    } else {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Server Error",
      });
    }
  }
};
