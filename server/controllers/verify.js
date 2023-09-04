import User from "../models/User.js";
import UserVerification from "../models/UserVerification.js";
import bcrypt from "bcrypt";
import { addTokens } from "../util/addTokens.js";
import { sendVerificationEmail } from "../util/verifyEmail.js";

export const verifyEmail = (req, res) => {
  let { userId, uniqueString } = req.params;
  UserVerification.findOne({ userId })
    .then((result) => {
      if (result) {
        const { expiresAt, uniqueString: hashedUniqueString } = result;
        if (expiresAt < Date.now()) {
          console.log("RESENDING");
          UserVerification.deleteOne({ userId })
            .then((result) => {
              User.findById(userId).then((user) => {
                sendVerificationEmail(
                  { _id: userId, email: user.email },
                  res,
                  true
                );
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
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        User.findOne({ _id: userId }).then((user) => {
                          res.json({
                            status: "SUCCESS",
                            message: "Verified successfully",
                          });
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
      console.log(err.message);
      res.json({
        status: "FAILED",
        message: "Failed to check verification existance",
      });
    });
};
