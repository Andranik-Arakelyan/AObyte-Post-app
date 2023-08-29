import transporter from "../config/gmail.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

import UserVerification from "../models/UserVerification.js";

export const sendVerificationEmail = (result, res) => {
  const { _id, email } = result;
  const uniqueString = v4() + _id;

  const verifyLink =
    process.env.REACT_URL +
    `verification/?id=${_id}&uniqueString=${uniqueString}`;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Please verify your email address to use all features of your account</p>
    <p>Press <b><a href=${verifyLink}>here</a></b> to verify</p>    `,
  };

  bcrypt
    .hash(uniqueString, 10)
    .then((hashedUniquestring) => {
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniquestring,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newVerification
        .save()
        .then((newVer) => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              console.log("EMAIL SENT");
              res.json({
                status: "SUCCESS",
                message: "Verification link sent to email",
                // userData: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "Failed to send email",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "Failed to save verification",
          });
        });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "Failed to hash unique string",
      });
    });
};
