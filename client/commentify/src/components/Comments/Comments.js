import React, { useState } from "react";

import { AddComment, Comment } from "../../components";
import DeleteDialog from "../Post/DeleteDialog";
import InButton from "../../UI/InButton";

import { useDispatch } from "react-redux";
import { sort } from "../../helpers";

import { ASCENDING, DESCENDING } from "../../constants";
import upSort from "../../assets/upsort.png";
import downSort from "../../assets/downsort.png";
import classes from "./Comments.module.css";
import { deleteComment, sortComments } from "../../features/posts/postsSlice";
// import { PostDataContext } from "../../context";

function Comments({ commentData, postId }) {
  const [sortDir, setSortDir] = useState(DESCENDING);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const dispatch = useDispatch();

  const comments = sort(commentData, sortDir, "rating");

  const changeSortDirection = () => {
    const dir = sortDir === DESCENDING ? ASCENDING : DESCENDING;
    setSortDir(dir);
    dispatch(
      sortComments({
        postId,
        dir,
      })
    );
  };

  const drawSortDirection = () => {
    return sortDir === DESCENDING ? (
      <div className={classes.sort}>
        <span>Highest rated</span>
        <InButton onClick={changeSortDirection}>
          <img src={upSort} alt="sortDir" />
        </InButton>
      </div>
    ) : (
      <div className={classes.sort}>
        <span>Lowest rated</span>
        <InButton onClick={changeSortDirection}>
          <img src={downSort} alt="sortDir" />
        </InButton>
      </div>
    );
  };

  const handleDeleteDialogState = () => {
    setDeleteDialog((prevDialog) => !prevDialog);
  };

  const deleteCommentHandler = (postId, commentId) => {
    // dispatch(deleteCom(postId, commentId));
    dispatch(deleteComment({ postId, commentId })).then(() => {
      handleDeleteDialogState();
    });
  };

  const drawComments = (comments) => {
    if (comments) {
      return comments.map((com) => {
        return (
          <li key={com.id}>
            <Comment
              commentData={com}
              postId={postId}
              openDeleteDialog={handleDeleteDialogState}
            />
            <DeleteDialog
              open={deleteDialog}
              handleClose={handleDeleteDialogState}
              deleteComment={() => {
                deleteCommentHandler(postId, com.id);
              }}
            />
          </li>
        );
      });
    }
  };
  return (
    <div className={classes.container}>
      {drawSortDirection()}
      <ul>{drawComments(comments)}</ul>
      <AddComment id={postId} />
    </div>
  );
}

export default Comments;
