import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth.js";
import { signUpValidation } from "../middleware/validations/signupValidation.js";
import { loginValidation } from "../middleware/validations/loginvalidation.js";

const router = express.Router();

router.post("/sign-up", signUpValidation, signUp);

router.post("/sign-in", loginValidation, logIn);

router.get("/logOut", logOut);

export default router;
