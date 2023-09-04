import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { editComment } from "./PostDetailApi";

function EditModal({ comment, handleModalClose, updateComments }) {
  const [commentValue, setCommentValue] = useState(comment.text);

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  const confirm = () => {
    editComment(comment._id, commentValue).then((data) => {
      if (data.status === "SUCCESS") {
        updateComments("edit", data.comment);
      } else if (data.message) {
        alert(data.message);
      }
      handleModalClose();
    });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Edit your comment?`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            sx={{ width: 500 }}
            margin="dense"
            id="name"
            label="Your comment"
            fullWidth
            value={commentValue}
            onChange={handleCommentChange}
            variant="standard"
          />
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

export default EditModal;
