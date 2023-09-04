import React, { useState } from "react";

import { useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";

import UserAvatar from "../UserAvatar/UserAvatar";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton } from "@mui/material";

import EditModal from "./EditModal";
import ConfirmDelete from "./ConfirmDelete";

import classes from "./PostDetail.module.css";

function Comment({ comment, updateComments }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const user = useSelector(getUser);

  const toggleDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  const toggleEditModal = () => {
    setEditModal((prev) => !prev);
  };

  return (
    <div className={classes.comment}>
      <div className={classes.avatar}>
        <UserAvatar userData={comment.creatorId} />
      </div>

      <div className={classes.userComment}>
        <span>{comment.creatorId.name}</span>
        <div>
          <span>{comment.text}</span>
        </div>
      </div>

      {user.userData?._id === comment.creatorId._id && (
        <div className={classes.actions}>
          <IconButton
            onClick={toggleEditModal}
            sx={{ padding: "3px" }}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          {editModal && (
            <EditModal
              comment={comment}
              handleModalClose={toggleEditModal}
              updateComments={updateComments}
            />
          )}

          <IconButton
            onClick={toggleDeleteModal}
            sx={{ padding: "3px" }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          {deleteModal && (
            <ConfirmDelete
              comment={comment}
              handleModalClose={toggleDeleteModal}
              updateComments={updateComments}
            />
          )}
        </div>
      )}
      <Divider />
    </div>
  );
}

export default Comment;
