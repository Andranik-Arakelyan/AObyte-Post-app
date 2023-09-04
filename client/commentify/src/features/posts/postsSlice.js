import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addNewComment, deleteCom, addPost } from "./postsApi";
import { sort } from "../../helpers";

const initialState = {
  posts: [],
  totalPages: 1,
  fetching: true,
  error: null,
  page: 1,
  filters: {},
};

export const downloadPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filters) => {
    try {
      const response = await fetchPosts(filters);
      return response;
    } catch (error) {
      throw new Error("Something went wrong fetching posts");
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (formData) => {
    try {
      const response = await addPost(formData);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

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
    changePage: (state, action) => {
      state.page = action.payload;
      state.fetching = true;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.fetching = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(downloadPosts.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.totalPages = action.payload.totalPages;
          state.fetching = false;
          state.posts = action.payload.posts;
        } else {
          state.error = action.payload.error;
        }
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
export const getFilters = (state) => state.filters;

export const { sortComments, changePage, setFilters } = postsSlice.actions;

export default postsSlice.reducer;
