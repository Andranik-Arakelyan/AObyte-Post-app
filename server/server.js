import express from "express";
import cors from "cors";
import { data } from "./data.js";
import { v4 } from "uuid";
import Multer from "multer";

const app = express();

app.use(express.json());
app.use(cors());

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// route which gets posts from Mongo db
app.get("/api/posts", async (req, res) => {
  //here must be posts fetching logic from Mongo
  res.send(data);
});

//route which adds new post in to Mongo db
app.post("/api/posts", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;

  const post = {
    id: v4(),
    date: new Date(),
    title,
    description,
  };

  // here must be adding post to mongo logic
  res.send(post);
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

app.listen(3001);
