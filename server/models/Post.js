import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),

    // () => {
    //   const threeDaysAgo = new Date();
    //   threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);
    //   return threeDaysAgo;
    // },
  },

  image_url: {
    type: String,
  },

  isPublic: {
    type: Boolean,
    required: true,
  },

  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: {
    type: [String],
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
