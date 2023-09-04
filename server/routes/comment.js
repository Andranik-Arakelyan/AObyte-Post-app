import express from "express";
import { jwtVerify } from "../middleware/jwtVerify.js";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/comments", jwtVerify, addComment);

router.delete("/comments/:commentId", jwtVerify, deleteComment);

router.put("/comments/:commentId", jwtVerify, editComment);

export default router;
