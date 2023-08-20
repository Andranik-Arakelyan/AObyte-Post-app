import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, getUser, verifyUser } from "../features/user/userSlice";
import { useLocation } from "react-router-dom";

function VerificationPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  console.log("USERSTATE :", user);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const uniqueString = queryParams.get("uniqueString");

  useEffect(() => {
    if (userId && uniqueString) {
      dispatch(verifyUser({ userId, uniqueString }));
    }
  }, [dispatch, userId, uniqueString]);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div>
      {user.auth ? (
        <h1>You have successfully verified</h1>
      ) : (
        <h1>We sent you verification link to your email, please check inbox</h1>
      )}
    </div>
  );
}

export default VerificationPage;
