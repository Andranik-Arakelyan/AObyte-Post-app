import express from "express";
import { verifyEmail } from "../controllers/verify.js";

const router = express.Router();

router.get("/verify/:userId/:uniqueString", verifyEmail);

export default router;
