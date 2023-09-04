import React, { useState } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { closeModal } from "../../features/loginModal/loginModalSlice";
import { loginUser } from "../../features/user/userSlice";

import CloseIcon from "@mui/icons-material/Close";
import InButton from "../../UI/InButton";
import Card from "../../UI/Card";
import { Backdrop } from "../../UI/Backdrop";

import loginSchema from "../../Validation/login";

import { HOME_PAGE, SIGN_UP } from "../../constants/path";

import classes from "./Login.module.css";

export const LoginModal = ({ closeIcon }) => {
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const handleSignUpClick = () => navigate(SIGN_UP);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setFieldError }) => {
      setSubmiting(true);

      dispatch(loginUser(values)).then((response) => {
        if (response.payload.status === "SUCCESS") {
          dispatch(closeModal());
          navigate(HOME_PAGE);
        } else {
          Object.entries(response.payload.errors).forEach((error) => {
            setFieldError(error[0], error[1]);
          });
        }
        setSubmiting(false);
      });
    },
  });

  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.topSide}>
          <p>
            Log Into Comment<span>i</span>fy
          </p>
          {closeIcon && (
            <InButton onClick={() => dispatch(closeModal())}>
              <CloseIcon />
            </InButton>
          )}
        </div>

        <div className={classes.formSide}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "rgb(231, 43, 43)" }}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "rgb(231, 43, 43)" }}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button type="submit">{submiting ? "Submiting" : "Log In"}</button>
          </form>
        </div>

        <div className={classes.registerSide}>
          <div className={classes.question}>
            <span>Don't have an account yet?</span>
          </div>
          <button onClick={handleSignUpClick}>Sign up</button>
        </div>
      </div>
    </Card>
  );
};

function Login(props) {
  const dispatch = useDispatch();
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            dispatch(closeModal());
          }}
        />,
        document.getElementById("back-drop")
      )}
      {ReactDOM.createPortal(
        <LoginModal closeIcon={true} />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Login;
