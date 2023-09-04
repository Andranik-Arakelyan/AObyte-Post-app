import React, { useState } from "react";

import { getUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/loginModal/loginModalSlice";

import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/SendSharp";

import { sendComment } from "./PostDetailApi";

import classes from "./PostDetail.module.css";

function AddComment({ postId, updateComments }) {
  const [commentValue, setCommentValue] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const cleanState = () => {
    setSending(false);
    setCommentValue("");
  };

  const handleSendComment = () => {
    if (!user.auth) {
      dispatch(openModal());
    } else {
      setSending(true);
      sendComment(commentValue, postId).then((data) => {
        if (data.status === "SUCCESS") {
          updateComments("add", data.comment);
        } else {
          if (data.message) {
            setError(data.message);
          }
        }
        cleanState();
      });
    }
  };

  return (
    <div id="addcomment" className={classes.addCommentContainer}>
      <TextField
        className={classes.comInput}
        id="outlined-basic"
        label="Add a comment"
        // sx={{ width: "80%", borderRadius: "25px" }}
        value={commentValue}
        onChange={handleCommentChange}
      />

      <IconButton
        onClick={handleSendComment}
        disabled={!commentValue || sending}
      >
        <SendIcon />
      </IconButton>

      {error && <div>{error}</div>}
    </div>
  );
}

export default AddComment;
