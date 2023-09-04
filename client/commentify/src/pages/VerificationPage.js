import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, verifyUser } from "../features/user/userSlice";

import { Button } from "@mui/material";

import { HOME_PAGE, LOGIN_PAGE } from "../constants/path";
import { loginStyle } from "../constants";

function VerificationPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const [response, setResponse] = useState(null);

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
      dispatch(verifyUser({ userId, uniqueString })).then((response) => {
        setResponse(response.payload);
      });
    }
  }, []);

  useEffect(() => {
    if (user.auth && !user.fetching) {
      navigate(HOME_PAGE);
    }
  });

  if (response) {
    if (response.status === "FAILED") {
      return (
        <div>
          <h1>{response.message}</h1>
        </div>
      );
    } else if (response.status === "SUCCESS") {
      return (
        <div>
          <h1>{response.message}</h1>
          <Button
            style={loginStyle}
            variant="outlined"
            onClick={() => navigate(LOGIN_PAGE)}
          >
            Log in
          </Button>
        </div>
      );
    }
  }

  return (
    (fromSignup || (userId && uniqueString)) && (
      <>
        {!userId && !uniqueString && (
          <div>
            <h1>
              We sent you verification link to your email, please check inbox
            </h1>
            <p>Please open the link within 12 hours</p>
          </div>
        )}
      </>
    )
  );
}

export default VerificationPage;
