import React from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./SignupForm.module.css";
import logo from "../../assets/Commentify.png";
import { HOME_PAGE } from "../../constants/path";
import InButton from "../../UI/InButton";

function SignupForm(props) {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate(HOME_PAGE);
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.container}>
      <InButton onClick={goToHomePage}>
        <img src={logo} alt="logo" style={{ width: "350px" }} />
      </InButton>

      <div className={classes.formPart}>
        <h2>It's easy to join us</h2>

        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}

        <Form method="post">
          <div className={classes.singleInput}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submiting" : "Sign up"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default SignupForm;
