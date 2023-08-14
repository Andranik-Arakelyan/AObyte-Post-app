import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewPost } from "./userApi";

const initialState = {};

export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  try {
    const response = await addNewPost(postData);
    return response.data;
  } catch (err) {
    throw new Error("Failed to add post, check your internet connection");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.postSubmitting = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.sending = false;
        // here must be logic to add created post to users state.posts
      })
      .addCase(addPost.rejected, (state, action) => {
        state.sending = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
