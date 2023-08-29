import React, { useState } from "react";
import ReactDOM from "react-dom";

import Card from "../../UI/Card";
import { useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../constants/path";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/loginModal/loginModalSlice";

import InButton from "../../UI/InButton";
import { Backdrop } from "../../UI/Backdrop";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./Login.module.css";
import { loginUser } from "../../features/user/userSlice";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const handleSignUpClick = () => navigate(SIGN_UP);

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmiting(true);
    const loginData = { email, password };

    dispatch(loginUser(loginData)).then(() => {
      setSubmiting(false);
      dispatch(closeModal());
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.topSide}>
          <p>
            Log Into Comment<span>i</span>fy
          </p>
          <InButton onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </InButton>
        </div>

        <div className={classes.formSide}>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
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
      {ReactDOM.createPortal(<LoginModal />, document.getElementById("modal"))}
    </>
  );
}

export default Login;
