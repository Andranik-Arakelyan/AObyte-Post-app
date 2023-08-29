import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { deletePost } from "./PostApi";

function ConfirmModal({ handleModalClose, post, message, confirmAction }) {
  const confirm = () => {
    confirmAction(post._id).then(() => handleModalClose());
  };

  return (
    <Dialog
      open={true}
      onClose={handleModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{`Are you sure you want to ${message} this post?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{post.title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#131032", fontWeight: "700" }}
          onClick={handleModalClose}
        >
          No
        </Button>
        <Button
          sx={{ color: "#131032", fontWeight: "700" }}
          onClick={() => confirm(post._id)}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
