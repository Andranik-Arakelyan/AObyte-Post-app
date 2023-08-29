import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { deletePost } from "./PostApi";

function DeleteModal({ handleDeleteModalClose, post }) {
  const handleDelete = () => {
    deletePost(post._id).then(() => handleDeleteModalClose());
  };

  return (
    <Dialog
      open={true}
      onClose={handleDeleteModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
      <DialogContent>
        <DialogContentText>{post.title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#131032", fontWeight: "700" }}
          onClick={handleDeleteModalClose}
        >
          No
        </Button>
        <Button
          sx={{ color: "#131032", fontWeight: "700" }}
          onClick={handleDelete}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
