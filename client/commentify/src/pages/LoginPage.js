import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

import { LoginModal } from "../components/Login/Login";

import { HOME_PAGE } from "../constants/path";

function LoginPage(props) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth) {
      navigate(HOME_PAGE);
    }
  }, [user.auth, navigate]);

  return (
    !user.auth &&
    !user.fetching && (
      <div className="container">
        <LoginModal />
      </div>
    )
  );
}

export default LoginPage;
