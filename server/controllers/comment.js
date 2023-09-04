import { ObjectId } from "mongodb";
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { text, postId } = req.body;

  const creatorId = req.userId;

  const newComment = new Comment({
    text,
    postId,
    creatorId,
  });

  newComment
    .save()
    .then((result) => {
      Comment.findOne({ _id: result._id })
        .populate("creatorId", "name avatar_url")
        .then((newCom) => {
          console.log("********");

          console.log("com added");
          res.json({
            status: "SUCCESS",
            comment: newCom,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Failed to save comment",
      });
    });
};

export const deleteComment = (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  Comment.findOne({ _id: commentId })
    .then((result) => {
      if (result.creatorId.toString() === userId) {
        Comment.deleteOne({ _id: new ObjectId(commentId) })
          .then(() => {
            console.log("COMMENT DELETED");
            res.json({
              status: "SUCCESS",
              message: "Post deleted",
            });
          })
          .catch((err) => {
            res.json({
              status: "FAILED",
              message: err.message,
            });
          });
      } else {
        res.json({
          status: "FAILED",
          message: "User can't manipulate others comments",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editComment = (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;
  const { text } = req.body;

  Comment.findOne({ _id: commentId })
    .then((result) => {
      if (result.creatorId.toString() === userId) {
        Comment.findOneAndUpdate({ _id: new ObjectId(commentId) }, { text })
          .then(() => {
            Comment.findOne({
              _id: commentId,
            })
              .populate("creatorId", "name avatar_url")
              .then((newComment) => {
                res.json({
                  status: "SUCCESS",
                  comment: newComment,
                });
              });
          })
          .catch((err) => {
            res.json({
              status: "FAILED",
              message: err.message,
            });
          });
      } else {
        res.json({
          status: "FAILED",
          message: "User can't manipulate others comments",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
