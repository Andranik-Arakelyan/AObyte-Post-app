import { api } from "../../api/api";

export const fetchAuthors = () => api.get("/usernames");
