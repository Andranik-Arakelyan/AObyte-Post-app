import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import searchReducer from "../features/search/searchSlice";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import addPostModalSliceReducer from "../features/addPostModal/addPostModalSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
    loginModal: loginModalReducer,
    addPostModal: addPostModalSliceReducer,
    counter: counterReducer,
  },
});
