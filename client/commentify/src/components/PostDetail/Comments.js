import React, { useState } from "react";

import { Divider } from "@mui/material";

import Comment from "./Comment";

import classes from "./PostDetail.module.css";

function Comments({ comments, updateComments }) {
  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          comment={comment}
          updateComments={updateComments}
        />
      );
    });
  };

  return (
    !!comments.length && (
      <>
        <ul className={classes.comments}>{renderComments()}</ul>
        <Divider />
      </>
    )
  );
}

export default Comments;
