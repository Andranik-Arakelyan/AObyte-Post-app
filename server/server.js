import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { data } from "./data.js";
import { v4 } from "uuid";
import Multer from "multer";
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verify.js";
import checkUserRoutes from "./routes/User.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import dbConfig from "./config/db.js";
import { jwtVerify } from "./middleware/jwtVerify.js";
import User from "./models/User.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(authRoutes);
app.use(verifyRoutes);
app.use(checkUserRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
