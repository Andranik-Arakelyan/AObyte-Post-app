import { Divider, List, ListItem } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { ADD_POST, MY_POSTS_PAGE, PROFILE_PAGE } from "../../constants/path";

import classes from "./Header.module.css";

function UserActions({ close, handleLogOut, buttonRef }) {
  const actionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target) &&
        event.target !== buttonRef.current
      ) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <List className={classes.dropDownContent} ref={actionsRef}>
      <Link to={PROFILE_PAGE}>
        <ListItem>My profile</ListItem>
      </Link>
      <Divider />
      <Link to={MY_POSTS_PAGE}>
        <ListItem>My posts</ListItem>
      </Link>
      <Divider />

      <div className={classes.newPost}>
        <Link to={ADD_POST}>
          <ListItem>Add a new post</ListItem>
        </Link>
        <Divider />
      </div>

      <ListItem onClick={handleLogOut}>
        <span>Log Out</span>
      </ListItem>
    </List>
  );
}

export default UserActions;
