import { api } from "../../api/api";

export const findPosts = (search) => api.post("posts/search", { search });
