import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { data } from "./data.js";
import { v4 } from "uuid";
import Multer from "multer";
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verify.js";
import checkUserRoutes from "./routes/checkUser.js";
import postRoutes from "./routes/post.js";
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

// route which gets posts from Mongo db
app.get("/posts", async (req, res) => {
  //here must be posts fetching logic from Mongo
  res.send(data);
});

app.get("/test", jwtVerify, (req, res) => {
  const { userId } = req;
  User.findOne({ _id: userId }).then((result) => {
    res.json({
      message: "SUCCESSED",
      user: result,
    });
  });
});

//route which creates new comment
app.post(`/api/posts/:postId/comments`, async (req, res) => {
  const { postId } = req.params;
  const { rating, comment } = req.body;

  const newCom = {
    id: v4(),
    rating,
    comment,
    replies: [],
    likes: 0,
  };

  //here must be adding new comment to mongo logic
  res.send(newCom);
});

// route which deletes comment
app.delete("/api/posts/:postId/comments/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  // here must be deleting specific comment from mongo logic
  res.send("Deleted successfuly");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
