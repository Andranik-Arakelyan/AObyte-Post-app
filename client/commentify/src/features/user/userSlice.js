import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewPost,
  checkUserExistance,
  createUser,
  logOut,
  login,
  verify,
} from "./userApi";
import { deleteCookie, getCookie } from "../../helpers/cookies";

const initialState = {
  auth: false,
  userData: null,
  error: null,
  fetching: true,
};

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const response = await checkUserExistance();
  return response;
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
  reducers: {
    addFavorite: (state, action) => {
      if (state.userData.favorites.includes(action.payload)) {
        const newFavorites = state.userData.favorites.filter(
          (fav) => fav !== action.payload
        );
        state.userData.favorites = newFavorites;
      } else {
        state.userData.favorites.push(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
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
          state.error = action.payload.errors;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === "SUCCESS") {
          const refreshToken = getCookie("refreshToken");
          localStorage.setItem("refreshToken", refreshToken);

          deleteCookie("refreshToken");

          state.error = null;

          state.auth = true;
          state.userData = action.payload.userData;
        } else {
          state.error = action.payload.errors;
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

export const { addFavorite } = userSlice.actions;

export default userSlice.reducer;
