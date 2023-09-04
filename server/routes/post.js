import express from "express";
import { jwtVerify } from "../middleware/jwtVerify.js";
// import { logIn, logOut, signUp } from "../controllers/auth.js";
import Multer from "multer";
import {
  addPost,
  deletePost,
  editPost,
  getPostDetails,
  getPosts,
  getUserPosts,
  searchPosts,
  updatePostStatus,
} from "../controllers/post.js";
import { newPostValidation } from "../middleware/validations/newPostValidation.js";
import { checkAuthor } from "../middleware/checkAuthor.js";

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const router = express.Router();

router.get("/posts", getPosts);

router.get("/posts/:postId", getPostDetails);

router.get("/user/posts", jwtVerify, getUserPosts);

router.post("/posts/search", searchPosts);

router.post(
  "/posts",
  jwtVerify,
  upload.single("uploadedPhoto"),
  newPostValidation,
  addPost
);

router.delete("/user/posts/:postId", jwtVerify, checkAuthor, deletePost);

router.put("/user/posts/:postId", jwtVerify, checkAuthor, updatePostStatus);

router.put(
  "/user/posts/:postId/edit",
  jwtVerify,
  upload.single("uploadedPhoto"),
  newPostValidation,
  checkAuthor,
  editPost
);

export default router;
