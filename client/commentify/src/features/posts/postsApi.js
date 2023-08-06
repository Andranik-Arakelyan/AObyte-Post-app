import { api } from "../../api/api";
import { data } from "../../data";
export const fetchPosts = () =>
  new Promise((res, rej) => {
    setTimeout(() => res({ data }), 600);
  });
