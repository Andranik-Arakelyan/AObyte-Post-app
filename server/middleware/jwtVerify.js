import jwt from "jsonwebtoken";

export const jwtVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    res.json({
      status: "NO TOKEN",
      message: "Token missing, user must login again",
    });
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      console.log("Verified with accessToken");
      req.userId = decoded.id;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        if (refreshToken) {
          try {
            const decoded = jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET
            );

            console.log("Verified with refreshToken");
            req.userId = decoded.id;

            const newAccessToken = jwt.sign(
              { id: decoded.id },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1m" }
            );

            res.cookie("accessToken", newAccessToken, {
              maxAge: 7 * 24 * 360 * 1000,
              httpOnly: true,
            });

            next();
          } catch (err) {
            res.json({
              status: "NO TOKEN",
              message: "Token missing, user must login again",
            });
          }
        } else {
          res.json({
            status: "NO REFRESH TOKEN",
            message: "Try to send refresh token",
          });
        }
      } else {
        res.json({
          status: "NO TOKEN",
          message: "Token missing, user must login again",
        });
      }
    }
  }
};
