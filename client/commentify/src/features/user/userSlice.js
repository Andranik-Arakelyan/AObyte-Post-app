import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewPost,
  checkUserExistance,
  createUser,
  logOut,
  login,
  verify,
} from "./userApi";

const initialState = {
  auth: false,
  userData: null,
  error: null,
  fetching: true,
};

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const response = await checkUserExistance();
  return response.data;
});

export const addUser = createAsyncThunk("user/addUser", async (formData) => {
  const response = await createUser(formData);

  return response.data;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    const response = await login(formData);
    return response.data;
  }
);

export const logOutUser = createAsyncThunk("user/logOutUser", async () => {
  const response = await logOut();
  return response.data;
});

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async ({ userId, uniqueString }) => {
    console.log(`Thunk kanchvec ${userId} ov u ${uniqueString}ov`);
    const response = await verify(userId, uniqueString);

    return response.data;
  }
);

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
      // .addCase(addPost.pending, (state) => {
      //   state.postSubmitting = true;
      // })
      // .addCase(addPost.fulfilled, (state) => {
      //   state.sending = false;
      //   // here must be logic to add created post to users state.posts
      // })
      // .addCase(addPost.rejected, (state, action) => {
      //   state.sending = false;
      //   state.error = action.error.message;
      // });
      .addCase(checkUser.fulfilled, (state, action) => {
        state.fetching = false;

        if (
          action.payload.status !== "NO TOKEN" &&
          action.payload.status !== "FAILED"
        ) {
          state.error = null;
          state.auth = true;
          state.userData = action.payload.userData;
        } else {
          state.error = action.payload.message;
          state.auth = false;
          state.userData = null;
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if (action.payload.status === "FAILED") {
          state.error = action.payload.message;
        }
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.error = null;
          state.auth = true;
          state.userData = action.payload.userData;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.error = null;
          state.auth = true;
          state.userData = action.payload.userData;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          state.auth = false;
          state.userData = null;
        }
      });
  },
});

export const getUser = (state) => state.user;

export default userSlice.reducer;
