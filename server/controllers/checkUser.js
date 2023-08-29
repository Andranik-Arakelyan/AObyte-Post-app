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
