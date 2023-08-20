import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignupForm.module.css";
import logo from "../../assets/Commentify.png";
import { HOME_PAGE, VERIFICATION } from "../../constants/path";
import InButton from "../../UI/InButton";
import { addUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

function SignupForm(props) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [submiting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const goToHomePage = () => {
    navigate(HOME_PAGE);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newUser = {
      name,
      dateOfBirth,
      email,
      password,
    };
    dispatch(addUser(newUser)).then(() => {
      navigate(VERIFICATION);
      setSubmitting(false);
    });
  };

  return (
    <div className={classes.container}>
      <InButton onClick={goToHomePage}>
        <img src={logo} alt="logo" style={{ width: "350px" }} />
      </InButton>

      <div className={classes.formPart}>
        <h2>It's easy to join us</h2>

        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className={classes.singleInput}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => handleNameChange(e)}
            />
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              required
              onChange={(e) => handleDateChange(e)}
            />
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => handleEmailChange(e)}
            />
          </div>

          <div className={classes.singleInput}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>

          {/* <div className={classes.singleInput}>
            <label htmlFor="confirm">Confirm password</label>
            <input type="password" id="confirm" name="confirm" required />
          </div> */}

          <button type="submit" disabled={submiting}>
            {submiting ? "Submiting" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
