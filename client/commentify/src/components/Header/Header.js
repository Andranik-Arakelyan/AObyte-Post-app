import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getSearchValue,
  setSearchValue,
} from "../../features/search/searchSlice";
import { openModal as openLoginModal } from "../../features/loginModal/loginModalSlice";
import { openModal as openAddModal } from "../../features/addPostModal/addPostModalSlice";

import { Avatar, Button, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

import { Link, useNavigate } from "react-router-dom";

import {
  ADD_POST,
  HOME_PAGE,
  MY_POSTS_PAGE,
  PROFILE_PAGE,
  SIGN_UP,
} from "../../constants/path";

import logo from "../../assets/Commentify.png";

import classes from "./Header.module.css";
import { getUser, logOutUser } from "../../features/user/userSlice";

const addPostStyle = {
  color: "#fff",
  fontWeight: 700,
  backgroundColor: "#FE6257",
};

export const loginStyle = {
  color: "#131032",
  fontWeight: 700,
  border: "2px solid #131032",
};

function Header({ searchBar, addPostButton }) {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchValue = useSelector(getSearchValue);
  const user = useSelector(getUser);

  const [boxShadow, setBoxShadow] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const handleLogOut = () => {
    dispatch(logOutUser()).then(() => {
      navigate(HOME_PAGE);
    });
  };

  const renderIfUserExists = (auth) => {
    return auth ? (
      <div className={classes.logedIn}>
        {addPostButton && (
          <Link to={ADD_POST}>
            <Button style={addPostStyle} variant="contained" color="success">
              Add a new Post
            </Button>
          </Link>
        )}
        <div className={classes.dropDown}>
          <Button className={classes.dropDownButton} onClick={handleDropDown}>
            <div className={classes.user}>
              <MenuIcon />
              <Avatar />
            </div>
          </Button>
          <List
            className={`${classes.dropDownContent} ${
              dropDown ? classes.dropDownContentBlock : ""
            }`}
          >
            <Link to={PROFILE_PAGE}>
              <ListItem>My profile</ListItem>
            </Link>
            <Divider />
            <Link to={MY_POSTS_PAGE}>
              <ListItem>My posts</ListItem>
            </Link>
            <Divider />
            <ListItem onClick={handleLogOut}>
              <span>Log Out</span>
            </ListItem>
          </List>
        </div>
      </div>
    ) : (
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
    );
  };

  const handleAddPostButtonClick = () => {
    if (user.auth) {
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
        {user.fetching ? <div></div> : renderIfUserExists(user.auth)}
      </div>
    </header>
  );
}

export default Header;
