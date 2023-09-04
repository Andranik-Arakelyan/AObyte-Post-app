import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { addUser } from "../../features/user/userSlice";

import InButton from "../../UI/InButton";

import signupSchema from "../../Validation/signup";

import { HOME_PAGE, VERIFICATION } from "../../constants/path";

import logo from "../../assets/Commentify.png";

import classes from "./SignupForm.module.css";

function SignupForm(props) {
  const navigate = useNavigate();

  const [submiting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setFieldError }) => {
      setSubmitting(true);

      dispatch(addUser(values)).then((response) => {
        if (response.payload.status === "SUCCESS") {
          navigate(VERIFICATION, { state: { fromSignUpPage: true } });
        } else {
          Object.entries(response.payload.errors).forEach((error) => {
            setFieldError(error[0], error[1]);
          });
        }
        setSubmitting(false);
      });
    },
  });

  // console.log(formik.errors);

  const goToHomePage = () => {
    navigate(HOME_PAGE);
  };

  return (
    <div className={classes.container}>
      <InButton onClick={goToHomePage}>
        <img src={logo} alt="logo" style={{ width: "350px" }} />
      </InButton>

      <div className={classes.formPart}>
        <h2>It's easy to join us</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className={classes.singleInput}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <div style={{ color: "red" }}>{formik.errors.dateOfBirth}</div>
            ) : null}
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="username"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "rgb(231, 43, 43)" }}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="new-password"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "rgb(231, 43, 43)" }}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              autoComplete="new-password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: "rgb(231, 43, 43)" }}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button type="submit" disabled={submiting}>
            {submiting ? "Submiting" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
