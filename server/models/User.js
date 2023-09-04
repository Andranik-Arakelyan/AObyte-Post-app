import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  posts: [String],
  verified: Boolean,
});

const User = mongoose.model("User", UserSchema);

export default User;
