import { api } from "../../api/api";
import { tokensHandler } from "../../helpers/cookies";

// export const fetchPosts = () => api.get("/posts");

export const addPost = async (formData) => {
  try {
    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return tokensHandler(response, async () => await addPost(formData));
  } catch (error) {
    console.error("ERROR OCCURED IN postsApi adding post");
    throw error;
  }
};

export const fetchPosts = async ({ page, filters }) => {
  const url = new URL(`${process.env.REACT_APP_SERVER_BASE_URL}posts`);

  url.searchParams.append("page", page);

  if (Object.entries(filters).length) {
    Object.entries(filters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const response = await api.get(url);
  return tokensHandler(
    response,
    async () => await fetchPosts({ page, filters })
  );
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
