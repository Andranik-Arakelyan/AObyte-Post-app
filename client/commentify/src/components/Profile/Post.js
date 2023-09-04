import React from "react";
import { Link } from "react-router-dom";

import { NO_IMAGE_URL } from "../../constants";

import classes from "./Post.module.css";

function Post({ postData }) {
  return (
    <Link to={`/posts/${postData._id}`} className={classes.postContent}>
      <div className={classes.imageContainer}>
        <img
          src={postData.image_url || NO_IMAGE_URL}
          className={classes.postImage}
          alt="post"
        />
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
