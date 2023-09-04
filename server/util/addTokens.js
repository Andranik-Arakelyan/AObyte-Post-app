import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export const addTokens = (id, res, user) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 7 * 24 * 3600 * 1000,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 2 * 60 * 1000,
  });

  res.json({
    status: "SUCCESS",
    message: "Signed in Successfully",
    userData: user,
  });
};
