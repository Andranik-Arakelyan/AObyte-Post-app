import express from "express";
import { jwtVerify } from "../middleware/jwtVerify.js";
// import { logIn, logOut, signUp } from "../controllers/auth.js";
import Multer from "multer";
import {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getUserPosts,
  updatePostStatus,
} from "../controllers/post.js";
import { newPostValidation } from "../middleware/validations/newPostValidation.js";

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const router = express.Router();

router.get("/posts", getPosts);

router.get("/user/posts", jwtVerify, getUserPosts);

router.post(
  "/posts",
  jwtVerify,
  upload.single("uploadedPhoto"),
  newPostValidation,
  addPost
);

router.delete("/user/posts/:postId", jwtVerify, deletePost);

router.put("/user/posts/:postId", jwtVerify, updatePostStatus);

router.put(
  "/user/posts/:postId/edit",
  jwtVerify,
  upload.single("uploadedPhoto"),
  newPostValidation,
  editPost
);

export default router;
