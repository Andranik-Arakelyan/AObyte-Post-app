import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { openModal as openLoginModal } from "../../features/loginModal/loginModalSlice";
import { getFilters, setFilters } from "../../features/posts/postsSlice";
import { getUser, logOutUser } from "../../features/user/userSlice";

import FoundPosts from "./FoundPosts";
import Logo from "./Logo";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserActions from "./UserActions";

import { Button, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { findPosts } from "./HeaderApi";

import { ADD_POST, HOME_PAGE, SIGN_UP } from "../../constants/path";

import { addPostStyle, loginStyle } from "../../constants";

import classes from "./Header.module.css";

function Header({ searchBar, addPostButton }) {
  const [boxShadow, setBoxShadow] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [showFounds, setShowFounds] = useState(false);
  const [foundPosts, setFoundPosts] = useState([]);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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

  useEffect(() => {
    if (!searchValue) {
      return setFoundPosts([]);
    }
    const id = setTimeout(() => {
      findPosts(searchValue)
        .then(({ data }) => {
          setFoundPosts(data);
        })
        .catch((err) => console.log(err.message));

      return () => clearTimeout(id);
    }, 300);
  }, [searchValue]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const filters = useSelector(getFilters);

  const openDropDown = (e) => {
    buttonRef.current = e.target;
    setDropDown(true);
  };

  const closeDropDown = () => {
    setDropDown(false);
  };

  const handleLogOut = () => {
    dispatch(logOutUser()).then(() => {
      navigate(HOME_PAGE);
    });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      if (searchValue.trim()) {
        setShowFounds(false);
        queryParams.set("page", 1);
        queryParams.set("title", searchValue);
        dispatch(setFilters({ ...filters, title: searchValue }));
        navigate(`${HOME_PAGE}?${queryParams.toString()}`);
      } else {
        queryParams.delete("title");
      }
    }
  };

  const renderIfUserExists = (auth) => {
    if (auth) {
      return (
        <div className={classes.logedIn}>
          {addPostButton && (
            <Link to={ADD_POST}>
              <Button style={addPostStyle} variant="contained" color="success">
                Add a new Post
              </Button>
            </Link>
          )}
          <div className={classes.dropDown}>
            <Button className={classes.dropDownButton} onClick={openDropDown}>
              <div className={classes.user}>
                <MenuIcon />
                <UserAvatar userData={user.userData} />
              </div>
            </Button>
            {dropDown && (
              <UserActions
                close={closeDropDown}
                handleLogOut={handleLogOut}
                buttonRef={buttonRef}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
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
    }
  };

  const handleAddPostButtonClick = () => {
    dispatch(openLoginModal());
  };

  return (
    <header className={`${classes.header} ${boxShadow && classes.boxShadow}`}>
      <div className={classes.container}>
        <Logo />
        <div className={classes.searchBar}>
          {searchBar && (
            <>
              <input
                onFocus={() => setShowFounds(true)}
                placeholder="Find a post"
                value={searchValue}
                type="text"
                ref={inputRef}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleEnter}
              />
              <FoundPosts
                posts={foundPosts}
                showFounds={showFounds}
                close={() => setShowFounds(false)}
                inputRef={inputRef}
              />
            </>
          )}
        </div>
        {user.fetching ? <div></div> : renderIfUserExists(user.auth)}
      </div>
    </header>
  );
}

export default Header;
