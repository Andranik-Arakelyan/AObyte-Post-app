import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
