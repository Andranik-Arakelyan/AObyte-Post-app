import React from "react";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "../../constants/path";
import NoImageIcon from "@mui/icons-material/ImageNotSupportedOutlined";

import classes from "./Post.module.css";

function Post({ postData }) {
  return (
    <Link to={HOME_PAGE} className={classes.postContent}>
      <div className={classes.imageContainer}>
        {postData.image_url ? (
          <img src={postData.image_url} className={classes.postImage} alt="" />
        ) : (
          <NoImageIcon />
        )}
      </div>
      <div className={classes.infoContainer}>
        <h3>{postData.title}</h3>
        <div style={{ textAlign: "left" }}>
          <div>
            <span> Category ＞ {postData.category} </span>
          </div>
          <div>
            <span>Status ＞ {postData.isPublic ? "public" : "private"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
