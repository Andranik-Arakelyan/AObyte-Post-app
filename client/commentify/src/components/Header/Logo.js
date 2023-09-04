import { ref } from "yup";

import React from "react";
import InButton from "../../UI/InButton";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants/path";
import { useDispatch } from "react-redux";
import { setFilters } from "../../features/posts/postsSlice";
import { Link } from "react-router-dom";

import logo from "../../assets/Commentify.png";
import classes from "./Header.module.css";

function Logo(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <InButton
      onClick={() => {
        navigate(HOME_PAGE, { replace: true });
        dispatch(setFilters({}));
        window.location.reload();
      }}
    >
      <Link to={HOME_PAGE}>
        <img className={classes.logo} src={logo} alt="logo" />
      </Link>
    </InButton>
  );
}

export default Logo;
