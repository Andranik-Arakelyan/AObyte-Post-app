import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/sign-up", signUp);

router.post("/sign-in", logIn);

router.get("/logOut", logOut);

export default router;
