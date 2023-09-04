import { api } from "../../api/api";
import { tokensHandler } from "../../helpers/cookies";

export const fetchPostDetails = (postId, userId) =>
  api.get(`posts/${postId}`, { userId });

export const sendComment = async (text, postId) => {
  const response = await api.post("comments", { text, postId });

  return tokensHandler(response, async () => await sendComment(text, postId));
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`comments/${commentId}`);
  return tokensHandler(response, async () => await deleteComment(commentId));
};

export const editComment = async (commentId, text) => {
  const response = await api.put(`comments/${commentId}`, { text });
  return tokensHandler(
    response,
    async () => await editComment(commentId, text)
  );
};
