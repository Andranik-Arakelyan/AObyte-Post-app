import { api } from "../../api/api";

export const deletePost = (postId) => api.delete(`user/posts/${postId}`);

export const changePublicStatus = (postId) => api.put(`user/posts/${postId}`);

export const editPost = (postId, formData) =>
  api.put(`user/posts/${postId}/edit`, formData);
