import { api } from "../../api/api";
import { tokensHandler } from "../../helpers/cookies";

export const addToFavorite = async (postId) => {
  const response = await api.put(`/favorite`, { postId });
  return tokensHandler(response, async () => await addToFavorite(postId));
};
