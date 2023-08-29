import { api } from "../../api/api";

export const fetchPosts = (page) => api.get(`/posts?page=${page}`);
