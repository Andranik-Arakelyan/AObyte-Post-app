import { ObjectId } from "mongodb";
import { bucket } from "../config/googleStorage.js";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const limit = 3;
  const currentPage = req.query.page || 1;
  const skip = (currentPage - 1) * limit;
  const posts = await Post.find({ isPublic: true })
    .skip(skip)
    .limit(limit)
    .populate("creatorId", "name avatar_url");
  const totalPostsCount = await Post.countDocuments({ isPublic: true });
  const totalPages = Math.ceil(totalPostsCount / limit);

  res.json({
    posts,
    totalPages,
  });
};

export const getUserPosts = (req, res) => {
  const userId = req.userId;
  Post.find({ creatorId: userId })
    .then((result) => {
      res.json({
        posts: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Failed to find user posts",
      });
    });
};

export const addPost = async (req, res) => {
  const { title, description, isPublic, category } = req.body;

  const creatorId = req.userId;
  const image = req.file;

  let image_url;

  if (image) {
    const imageRef = bucket.file(`images/${image.originalname}`);

    await imageRef.save(image.buffer, {
      metadata: {
        contentType: image.mimetype,
        cacheControl: "public, max-age=31536000",
      },
    });

    image_url = `https://storage.googleapis.com/${bucket.name}/${imageRef.name}`;
  } else {
    image_url = "";
  }

  const newPost = new Post({
    title,
    description,
    category,
    isPublic,
    image_url,
    creatorId,
  });

  newPost
    .save()
    .then(() => {
      res.json({
        status: "SUCCESS",
        post: newPost,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Failed to save post",
      });
    });
};

export const deletePost = async (req, res) => {
  const postId = req.params.postId;
  console.log("POST_ID -->", postId);
  try {
    const result = await Post.deleteOne({ _id: new ObjectId(postId) });
    console.log("POST DELETED");
    res.json({
      status: "SUCCES",
      message: "Post deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePostStatus = async (req, res) => {
  const postId = req.params.postId;

  try {
    const result = await Post.findOneAndUpdate({ _id: new ObjectId(postId) }, [
      { $set: { isPublic: { $not: "$isPublic" } } },
    ]);
    res.json({
      status: "SUCCES",
      message: "Succed to change post status",
    });
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (req, res) => {
  const postId = req.params.postId;
  const { title, description, category } = req.body;
  const image = req.file;
  let editedPost;

  if (image) {
    const imageRef = bucket.file(`images/${image.originalname}`);

    await imageRef.save(image.buffer, {
      metadata: {
        contentType: image.mimetype,
        cacheControl: "public, max-age=31536000",
      },
    });

    const image_url = `https://storage.googleapis.com/${bucket.name}/${imageRef.name}`;

    editedPost = {
      title,
      description,
      category,
      image_url,
    };
  } else {
    editedPost = {
      title,
      description,
      category,
    };
  }

  try {
    const result = await Post.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      editedPost
    );
    res.json({
      status: "SUCCES",
      message: "Succed to edit post",
    });
  } catch (error) {
    console.log(error);
  }
};
