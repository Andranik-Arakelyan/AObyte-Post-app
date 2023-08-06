import React from "react";
import classes from "./PostDetail.module.css";
import { Comments } from "../../components";

function PostDetail({ title, description, comments, imageUrl, id }) {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h3>{title}</h3>
      </div>
      <div className={classes.description}>
        <p>{description}</p>
      </div>

      <div className={classes.postImage}>
        <img src={imageUrl} alt="" />
      </div>

      <div className={classes.comments}>
        <Comments comsData={comments} postId={id} />
      </div>
    </div>
  );
}

export default PostDetail;
