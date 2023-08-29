import { api } from "../../api/api";

export const fetchUserPosts = () => api.get(`user/posts`);
