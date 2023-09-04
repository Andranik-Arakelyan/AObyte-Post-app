import { ObjectId } from "mongodb";
import { bucket } from "../config/googleStorage.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getPosts = async (req, res) => {
  const limit = 3;
  const currentPage = req.query.page || 1;

  const { categories, date, author, sort, title } = req.query;

  const query = {};

  query.isPublic = true;

  if (categories) {
    query.category = { $in: categories.split(",") };
  }

  if (author) {
    const users = await User.find({ name: author });
    const userIds = users.map((user) => user._id);
    query.creatorId = { $in: userIds };
  }

  if (date === "today") {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    query.createdAt = { $gte: now };
  } else if (date === "week") {
    const currentDate = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    query.createdAt = { $gte: startOfWeek };
  } else if (date === "month") {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    query.createdAt = { $gte: startOfMonth };
  }

  if (title) {
    try {
      const regex = new RegExp(title, "i");
      query.title = { $regex: regex };
    } catch (err) {
      res.json({
        status: "FAILED",
        posts: [],
        totalPages: 0,
      });
      console.log(err.message);
    }
  }

  let aggregationPipeline = [
    { $match: query },
    {
      $lookup: {
        from: "users",
        localField: "creatorId",
        foreignField: "_id",
        as: "creatorId",
      },
    },
    {
      $unwind: "$creatorId",
    },
    {
      $project: {
        title: 1,
        description: 1,
        createdAt: 1,
        image_url: 1,
        likes: 1,
        category: 1,
        isPublic: 1,
        _id: 1,
        "creatorId.name": 1,
        "creatorId.avatar_url": 1,
        "creatorId._id": 1,
      },
    },
  ];

  if (sort) {
    switch (sort) {
      case "new":
        aggregationPipeline.push({ $sort: { createdAt: -1 } });
        break;
      case "old":
        aggregationPipeline.push({ $sort: { createdAt: 1 } });
        break;
      case "good":
        aggregationPipeline.push(
          { $addFields: { likesCount: { $size: "$likes" } } },
          { $sort: { likesCount: -1, _id: 1 } }
        );
        break;
      case "bad":
        aggregationPipeline.push(
          { $addFields: { likesCount: { $size: "$likes" } } },
          { $sort: { likesCount: 1, _id: 1 } }
        );
        break;
      default:
        break;
    }
  } else {
    aggregationPipeline.push({ $sort: { createdAt: -1 } });
  }

  const skip = (currentPage - 1) * limit;

  aggregationPipeline.push({ $skip: skip }, { $limit: limit });

  const posts = await Post.aggregate(aggregationPipeline).exec();

  const totalPostsCount = await Post.countDocuments(query);
  const totalPages = Math.ceil(totalPostsCount / limit);

  res.json({
    status: "SUCCESS",
    posts,
    totalPages,
  });
};

export const getPostDetails = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const postData = await Post.findOne({ _id: postId }).populate(
      "creatorId",
      "name avatar_url"
    );

    const comments = await Comment.find({ postId }).populate(
      "creatorId",
      "name avatar_url"
    );

    if (postData.isPublic) {
      res.json({
        status: "SUCCESS",
        postData,
        comments,
      });
    } else if (postData.creatorId === userId) {
      res.json({
        status: "SUCCESS",
        postData,
        comments,
      });
    } else {
      res.json({
        status: "FAILED",
        message: "User can't interact with others private posts",
      });
    }
  } catch (error) {
    res.json({
      status: "NO_PAGE",
      message: error.message,
    });
  }
};

export const searchPosts = async (req, res) => {
  const { search } = req.body;

  try {
    const regex = new RegExp(search, "i");

    const foundPosts = await Post.find({
      title: { $regex: regex },
      isPublic: true,
    }).limit(5);

    res.send(foundPosts);
  } catch (err) {
    res.send([]);
    console.log(err.message);
  }
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
  try {
    const result = await Post.deleteOne({ _id: new ObjectId(postId) });
    res.json({
      status: "SUCCESS",
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
      status: "SUCCESS",
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
      status: "SUCCESS",
      message: "Succed to edit post",
    });
  } catch (error) {
    console.log(error);
  }
};
