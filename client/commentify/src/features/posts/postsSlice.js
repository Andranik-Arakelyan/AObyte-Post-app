import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsApi";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const downloadPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPosts();
  return response.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(downloadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(downloadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
