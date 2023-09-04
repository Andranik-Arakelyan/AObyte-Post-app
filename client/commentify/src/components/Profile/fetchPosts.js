import { api } from "../../api/api";
import { tokensHandler } from "../../helpers/cookies";

export const fetchUserPosts = async () => {
  const response = await api.get(`user/posts`);
  return tokensHandler(response, async () => await fetchUserPosts());
};
