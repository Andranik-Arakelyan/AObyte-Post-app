import express from "express";
import { jwtVerify } from "../middleware/jwtVerify.js";
import { checkUser } from "../controllers/checkUser.js";

const router = express.Router();

router.get("/check-user", jwtVerify, checkUser);

export default router;
