import express from "express";
import { jwtVerify } from "../middleware/jwtVerify.js";
import {
  addToFavorites,
  checkUser,
  getUsernames,
} from "../controllers/User.js";

const router = express.Router();

router.get("/check-user", jwtVerify, checkUser);

router.get("/usernames", getUsernames);

router.put("/favorite", jwtVerify, addToFavorites);

export default router;
