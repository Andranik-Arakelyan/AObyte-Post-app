import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getSearchValue,
  setSearchValue,
} from "../../features/search/searchSlice";
import { openModal as openLoginModal } from "../../features/loginModal/loginModalSlice";
import { openModal as openAddModal } from "../../features/addPostModal/addPostModalSlice";

import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { HOME_PAGE, SIGN_UP } from "../../constants/path";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";

const addPostStyle = {
  color: "#fff",
  fontWeight: 700,
  backgroundColor: "#FE6257",
};

const loginStyle = {
  color: "#131032",
  fontWeight: 700,
  border: "2px solid #131032",
};

function Header({ searchBar }) {
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValue);
  const [boxShadow, setBoxShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHaveBoxShadow = window.scrollY > 60;
      setBoxShadow(shouldHaveBoxShadow);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddPostButtonClick = () => {
    if (true) {
      dispatch(openAddModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <header className={`${classes.header} ${boxShadow && classes.boxShadow}`}>
      <div className={classes.container}>
        <Link to={HOME_PAGE}>
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
        <div className={classes.searchBar}>
          {searchBar && (
            <input
              onDragOver={(e) => e.preventDefault()}
              placeholder="Find a post"
              value={searchValue}
              type="text"
              onChange={(e) => {
                dispatch(setSearchValue(e.target.value));
              }}
            />
          )}
        </div>
        <div className={classes.login}>
          <Link to={SIGN_UP}>Sign up</Link>
          <Button
            style={loginStyle}
            variant="outlined"
            onClick={() => dispatch(openLoginModal())}
          >
            Log In
          </Button>
          <Button
            style={addPostStyle}
            variant="contained"
            color="success"
            onClick={handleAddPostButtonClick}
          >
            Add a new Post
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
