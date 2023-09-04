import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { deleteComment } from "./PostDetailApi";

function ConfirmDelete({ comment, handleModalClose, updateComments }) {
  const confirm = () => {
    deleteComment(comment._id).then((data) => {
      if (data.status === "SUCCESS") {
        updateComments("delete", comment);
      } else if (data.message) {
        alert(data.message);
      }
    });
    handleModalClose();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Are you sure you want to delete this comment?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{comment.text}</DialogContentText>
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
            onClick={() => confirm()}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;
