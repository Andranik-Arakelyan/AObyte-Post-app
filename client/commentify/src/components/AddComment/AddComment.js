import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import InButton from "../../UI/InButton";
// import { addCom } from "../../features/postsSlice";
import { useDispatch } from "react-redux";

import send from "../../assets/send.png";

import classes from "./AddComment.module.css";
import { addComment } from "../../features/posts/postsSlice";

function AddComment({ id }) {
  const [comment, setComment] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [sending, setSending] = useState(false);

  const dispatch = useDispatch();

  const resetState = () => {
    setComment("");
    setRatingValue(5);
  };

  const commentChangeHandler = (value) => {
    setComment(value);
  };

  const ratingChangeHandler = (value) => {
    setRatingValue(value);
  };

  const addCommentHandler = () => {
    if (comment !== "") {
      setSending(true);

      const newComment = {
        comment,
        rating: ratingValue,
      };

      dispatch(addComment({ id, newComment }))
        .then(() => {
          setSending(false);
          resetState();
        })
        .catch((err) => {
          setSending(false);
          resetState();
        });
    }
  };

  return (
    <div className={classes.container}>
      <textarea
        value={comment}
        placeholder="What do you think about this?"
        onChange={(e) => commentChangeHandler(e.target.value)}
      />
      <div>
        <Typography component="legend">Rate this post</Typography>
        <Rating
          name="simple-controlled"
          disabled={sending}
          value={ratingValue}
          precision={0.2}
          onChange={(event, newValue) => {
            ratingChangeHandler(newValue);
          }}
        />
      </div>
      {sending ? (
        <CircularProgress />
      ) : (
        <InButton onClick={addCommentHandler}>
          <SendIcon color="primary" />
        </InButton>
      )}
    </div>
  );
}

export default AddComment;
