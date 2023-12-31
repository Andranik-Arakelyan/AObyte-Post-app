import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../util/verifyEmail.js";
import jwt from "jsonwebtoken";
import { addTokens } from "../util/addTokens.js";

export const signUp = (req, res, next) => {
  let { name, email, password, dateOfBirth } = req.body;

  User.findOne({ email })
    .then((result) => {
      if (result) {
        return res.json({
          status: "FAILED",
          errors: { email: "User with this email already exists" },
        });
      } else {
        bcrypt.hash(password.trim(), 10).then((hashedPassword) => {
          const newUser = new User({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword,
            dateOfBirth,
            verified: false,
            posts: [],
          });

          newUser
            .save()
            .then((result) => {
              sendVerificationEmail(result, res);
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "An error occured while saving user!",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "An error occured while checking user existing ",
      });
    });
};

export const logIn = (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (!user.verified) {
          return res.json({
            status: "FAILED",
            message: "You must verify your email before log in",
          });
        }
        const hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword).then((result) => {
          if (result) {
            addTokens(user._id, res, user);
          } else {
            res.json({
              status: "FAILED",
              errors: { password: "Wrong password" },
            });
          }
        });
      } else {
        res.json({
          status: "FAILED",
          errors: { email: "User with this email doesn't exists" },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logOut = (req, res) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
  });

  res.json({
    status: "SUCCESS",
  });
};
