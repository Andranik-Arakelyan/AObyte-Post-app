import { api } from "../../api/api";
import { tokensHandler } from "../../helpers/cookies";

export const deletePost = async (postId, creatorId) => {
  const response = await api.delete(`user/posts/${postId}`, {
    data: { creatorId },
  });
  return tokensHandler(
    response,
    async () => await deletePost(postId, creatorId)
  );
};

export const changePublicStatus = async (postId, creatorId) => {
  const response = await api.put(`user/posts/${postId}`, { creatorId });
  return tokensHandler(
    response,
    async () => await changePublicStatus(postId, creatorId)
  );
};

export const editPost = async (postId, formData) => {
  const response = await api.put(`user/posts/${postId}/edit`, formData);
  return tokensHandler(response, async () => await editPost(postId, formData));
};
