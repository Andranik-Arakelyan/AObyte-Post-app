import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },

  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
