import React, { useState } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import GradeIcon from "@mui/icons-material/Grade";
import Avatar from "@mui/material/Avatar";

import { getRandomAvatar } from "../../helpers";

import InButton from "../../UI/InButton";

import classes from "./Comment.module.css";
// import Replies from "./Replies";

function Comment({ openDeleteDialog, commentData }) {
  const { id: comId, comment, replies: comReplies, rating } = commentData;
  const avatar = getRandomAvatar();
  // const [openReplies, setOpenReplies] = useState(false);
  // const [replies, setReplies] = useState(comReplies || []);

  // const handleRepliesModal = () => {
  //   setOpenReplies((prevOpenReplies) => !prevOpenReplies);
  // };

  // const handlerepliesRefresh = (newReplies) => {
  //   setReplies(newReplies);
  // };

  const gradeIconStyle = {
    color: "#FFC107",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={classes.commentContainer}>
        <div className={classes.comment}>
          <Avatar src={avatar} alt="avatar" />
          <p>{comment}</p>
        </div>

        <div className={classes.actions}>
          <InButton onClick={openDeleteDialog}>
            <DeleteOutlineOutlinedIcon color="primary" />
          </InButton>

          <div className={classes.rate}>
            <GradeIcon style={gradeIconStyle} />
            <span>{rating}</span>
          </div>
        </div>
      </div>

      <div className={classes.likeReply}>
        <InButton>
          <ThumbUpIcon color="primary" />
          <span>Like</span>
        </InButton>
        <InButton>
          <ReplyIcon color="primary" />
          <span>Reply</span>
        </InButton>
      </div>

      {/* {openReplies && (
        <Replies
          comment={comment}
          comId={comId}
          replies={replies}
          refreshReplies={(newReplies) => handlerepliesRefresh(newReplies)}
          onClose={handleRepliesModal}
        />
      )} */}
    </div>
  );
}

export default Comment;
