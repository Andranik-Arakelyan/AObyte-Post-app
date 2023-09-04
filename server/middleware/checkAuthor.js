export const checkAuthor = (req, res, next) => {
  const userId = req.userId;
  const { creatorId } = req.body;

  if (userId === creatorId) {
    next();
  } else {
    return res.json({
      status: "FAILED",
      message: "User can't interact with someone else posts",
    });
  }
};
