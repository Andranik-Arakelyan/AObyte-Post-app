import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/ModeComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, getUser } from "../../features/user/userSlice";
import { openModal } from "../../features/loginModal/loginModalSlice";

import { useSpring, animated } from "react-spring";

import UserAvatar from "../UserAvatar/UserAvatar";
import InButton from "../../UI/InButton";
import { addToFavorite } from "../Posts/PostsApi";

import { getDateForm } from "../../helpers";
import { NO_IMAGE_URL } from "../../constants";

import classes from "./PostCard.module.css";

export default function PostCard({ postData }) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [likesCount, setLikesCount] = useState(postData.likes.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    if (!user.auth) {
      return dispatch(openModal());
    }

    addToFavorite(postData._id).then((data) => {
      if (data.status === "SUCCESS") {
        dispatch(addFavorite(postData._id));
        setLikesCount((prevCount) => (data.liked ? ++prevCount : --prevCount));
      } else {
        alert(data.message);
      }
    });
  };

  const maxLength = 150;
  const description = expanded
    ? postData.description
    : postData.description.slice(0, maxLength);

  const fadeProps = useSpring({
    opacity: expanded ? 1 : 0.5,
  });

  return (
    <>
      <div className={classes.postContainer}>
        <div className={classes.postHeader}>
          <div className={classes.creator}>
            <UserAvatar userData={postData.creatorId} />
            <span>{postData.creatorId.name}</span>
          </div>
          <div className={classes.title}>
            <Link to={`/posts/${postData._id}`}>{postData.title}</Link>
            <span>{getDateForm(postData.createdAt)}</span>
            <span> Category ＞ {postData.category}</span>
          </div>

          {user.auth && user.userData._id === postData.creatorId._id && (
            <div>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className={classes.postImage}>
          <img src={postData.image_url || NO_IMAGE_URL} />
        </div>

        <div className={classes.postDescription}>
          <animated.p
            style={{
              ...fadeProps,
              overflow: "hidden",
              height: expanded ? "auto" : "3rem",
            }}
            className={expanded ? classes.expanded : ""}
          >
            {description}
          </animated.p>
          {postData.description.length > maxLength && (
            <InButton onClick={handleExpandClick}>
              <span>{expanded ? "Show Less" : "Show more"}</span>
            </InButton>
          )}
        </div>

        <div className={classes.postActions}>
          <div
            onClick={handleLike}
            className={`${classes.action} ${
              user.userData?.favorites.includes(postData._id)
                ? classes.liked
                : ""
            }`}
          >
            <span>Favorite</span>
            <FavoriteIcon />
            <span>{likesCount}</span>
          </div>

          <HashLink
            to={`posts/${postData._id}#addcomment`}
            smooth
            className={classes.action}
          >
            <span>Leave a comment</span>
            <CommentIcon />
          </HashLink>
        </div>
      </div>
    </>
  );
}
