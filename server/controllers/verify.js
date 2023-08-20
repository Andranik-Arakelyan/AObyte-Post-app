import User from "../models/User.js";
import UserVerification from "../models/UserVerification.js";
import bcrypt from "bcrypt";
import { addTokens } from "../util/addTokens.js";

export const verifyEmail = (req, res) => {
  let { userId, uniqueString } = req.params;
  console.log(`MTAV VERIFY CONTROLLER ${userId}ov u ${uniqueString}ov`);
  UserVerification.findOne({ userId })
    .then((result) => {
      if (result) {
        const {
          expiresAt,
          createdAt,
          uniqueString: hashedUniqueString,
        } = result;
        if (createdAt + expiresAt < Date.now()) {
          UserVerification.deleteOne({ userId })
            .then((result) => {
              res.json({
                status: "FAILED",
                message:
                  "That link you clicked is not valid enymore, we will send new link to your email",
              });
            })
            .catch(() => {
              res.json({
                status: "FAILED",
                message: "Failed to delete verification record",
              });
            });
        } else {
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                User.updateOne({ _id: userId }, { $set: { verified: true } })
                  .then((result) => {
                    console.log("User verify status updated");

                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        User.findOne({ _id: userId }).then((user) => {
                          console.log("UPDATED USER IS :", user);
                          addTokens(userId, res, user);
                        });
                      })
                      .catch((err) => {
                        res.json({
                          status: "FAILED",
                          message: "Failed to delete verification",
                        });
                      });
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "Failed to update user verify status",
                    });
                  });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid verification details. Check inbox",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Failed to compare unique strings",
              });
            });
        }
      } else {
        res.json({
          status: "FAILED",
          message: "Account doesn't exist or has been verified already",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "Failed to check verification existance",
      });
    });
};
