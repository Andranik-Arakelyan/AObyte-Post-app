import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const addPostModalSlice = createSlice({
  name: "addPostModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = addPostModalSlice.actions;

export const getAddPostModalStatus = (state) => state.addPostModal.open;

export default addPostModalSlice.reducer;
