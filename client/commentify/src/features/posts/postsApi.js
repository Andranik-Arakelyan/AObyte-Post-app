import { api } from "../../api/api";

export const fetchPosts = () => api.get("/posts");

export const addPost = async (formData) => {
  try {
    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("ERROR OCCURED IN postsApi adding post");
    throw error;
  }
};

export const addNewComment = async (postId, comData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, comData);
    return response.data;
  } catch (err) {
    console.log("ERROR OCCURED IN postsApi.js adding comment");
    throw err;
  }
};

export const deleteCom = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response;
  } catch (err) {
    console.log("ERROR OCCURED in postsApi.js deleting comment");
    throw err;
  }
};
