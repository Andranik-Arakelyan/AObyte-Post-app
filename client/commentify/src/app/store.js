import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import searchReducer from "../features/search/searchSlice";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import addPostModalSliceReducer from "../features/addPostModal/addPostModalSlice";
import userSliceReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userSliceReducer,
    search: searchReducer,
    loginModal: loginModalReducer,
    addPostModal: addPostModalSliceReducer,
    counter: counterReducer,
  },
});
