import Post from "../models/Post.js";
import User from "../models/User.js";

export const checkUser = (req, res) => {
  const { userId } = req;

  User.findOne({ _id: userId })
    .then((result) => {
      if (result) {
        res.json({
          message: "SUCCESSED",
          userData: result,
        });
      } else {
        res.json({
          message: "FAILED",
          user: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Failed to check user existance",
      });
    });
};

export const getUsernames = async (req, res) => {
  try {
    const users = await User.find({}, "name");

    let names = users.map((user) => user.name);

    names = [...new Set(names)];

    res.json({
      status: "SUCCESS",
      usernames: names,
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

export const addToFavorites = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.body;

  try {
    const user = await User.findById(userId);
    if (user.favorites.includes(postId)) {
      const result = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { favorites: postId },
        },
        { new: true }
      );
    } else {
      const result = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { favorites: postId },
        },
        { new: true }
      );
    }

    const post = await Post.findById(postId);

    if (post.likes.includes(userId)) {
      const result = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
      res.json({
        status: "SUCCESS",
        liked: false,
      });
    } else {
      const result = await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: userId },
        },
        { new: true }
      );
      res.json({
        status: "SUCCESS",
        liked: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
};
