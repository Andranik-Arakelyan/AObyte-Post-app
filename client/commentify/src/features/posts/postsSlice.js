import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addNewComment, deleteCom } from "./postsApi";
import { sort } from "../../helpers";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const downloadPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await fetchPosts();
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong fetching posts");
  }
});

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ id, newComment }) => {
    try {
      const response = await addNewComment(id, newComment);
      return { postId: id, comData: response };
    } catch {
      throw new Error("Failed to add a comment");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deletecomment",
  async ({ postId, commentId }) => {
    try {
      await deleteCom(postId, commentId);
      return {
        postId,
        commentId,
      };
    } catch (err) {
      throw new Error("Failed to delete comment");
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortComments: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      post.comments = sort(post.comments, action.payload.dir, "rating");
    },
  },

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
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload.postId
        );
        post.comments.push(action.payload.comData);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        state.posts[postId].comments = state.posts[postId].comments.filter(
          (com) => com.id !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectPosts = (state) => state.posts;

export const { sortComments } = postsSlice.actions;

export default postsSlice.reducer;
