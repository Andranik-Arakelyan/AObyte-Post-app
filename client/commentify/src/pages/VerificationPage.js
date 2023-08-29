import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, getUser, verifyUser } from "../features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../constants/path";
import { Button } from "@mui/material";

import { loginStyle } from "../components/Header/Header";

function VerificationPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const [message, setMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const uniqueString = queryParams.get("uniqueString");

  const fromSignup = location.state && location.state.fromSignUpPage;

  useEffect(() => {
    if (!fromSignup && (!userId || !uniqueString)) {
      return navigate(HOME_PAGE);
    }

    if (userId && uniqueString) {
      console.log("Kanchvec verify");
      dispatch(verifyUser({ userId, uniqueString })).then((response) => {
        console.log(response);
        if (response.payload.status === "FAILED") {
          alert(response.payload.status, "\n", response.payload.message);
        } else if (response.payload.status === "SUCCESS") {
          // setTimeout(() => navigate(LOGIN_PAGE), 3000);
          console.log("Mtav else-i mej");

          setMessage(response.payload.message);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user.auth && !user.fetching) {
      navigate(HOME_PAGE);
    }
  });

  // useEffect(() => {
  //   dispatch(checkUser());
  // }, [dispatch]);

  return (
    (fromSignup || (userId && uniqueString)) && (
      <>
        {!userId && !uniqueString && (
          <div>
            <h1>
              We sent you verification link to your email, please check inbox
            </h1>
          </div>
        )}
        {message && (
          <div>
            <h1>{message}</h1>
            <Button
              style={loginStyle}
              variant="outlined"
              onClick={() => navigate(LOGIN_PAGE)}
            >
              Log in
            </Button>
          </div>
        )}
      </>
    )
  );
}

export default VerificationPage;
