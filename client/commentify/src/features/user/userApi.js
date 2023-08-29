import { api } from "../../api/api";

export const checkUserExistance = () => api.get(`check-user`);

export const createUser = (formData) => api.post(`sign-up`, formData);

export const login = (formData) => api.post(`sign-in`, formData);

export const logOut = () => api.get(`logOut`);

export const verify = (userId, uniqueString) =>
  api.get(`verify/${userId}/${uniqueString}`);

export const addNewPost = async ({ title, description, image }) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await api.post(`/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("ERROR OCCURED IN postsApi");
    throw error;
  }
};
