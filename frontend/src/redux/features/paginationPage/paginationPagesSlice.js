import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: [1],
};

export const getPage = createSlice({
  name: "page",
  initialState,
  reducers: {
    page: (state, action) => {
      state.page = action.payload;
    },
  },
});


export const { page } = getPage.actions;

export default getPage.reducer;