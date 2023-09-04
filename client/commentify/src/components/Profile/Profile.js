import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser, logOutUser } from "../../features/user/userSlice";

import Post from "./Post";

import { Avatar, List, ListItem } from "@mui/material";

import { fetchUserPosts } from "./fetchPosts";

import { ADD_POST, HOME_PAGE } from "../../constants/path";

import classes from "./Profile.module.css";
import UserAvatar from "../UserAvatar/UserAvatar";

function Profile(props) {
  const [fetching, setFetching] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    fetchUserPosts().then((data) => {
      setFetching(false);
      setUserPosts(data.posts);
    });
  }, []);

  const renderPosts = () => {
    if (!userPosts.length) {
      return (
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          Here will be shown your posts
        </p>
      );
    }
    return userPosts.map((post) => <Post key={post._id} postData={post} />);
  };

  const handleLogOut = () => {
    dispatch(logOutUser()).then(() => {
      navigate(HOME_PAGE);
    });
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.profile}>
          <div className={classes.userInfo}>
            <UserAvatar userData={user.userData} src={user.userData.avatar} />
            <h3>{user.userData.name}</h3>
          </div>
          <div>
            <List>
              <ListItem>
                <span>Favorite posts</span>
              </ListItem>

              <ListItem onClick={() => navigate(ADD_POST)}>
                <span>Add a post</span>
              </ListItem>

              <ListItem onClick={handleLogOut}>
                <span>Log Out</span>
              </ListItem>
            </List>
          </div>
        </div>
        {!fetching && <div className={classes.posts}>{renderPosts()}</div>}
      </div>
    </div>
  );
}

export default Profile;
