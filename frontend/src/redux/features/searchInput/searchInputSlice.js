import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchInput: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchInput } = searchSlice.actions;

export default searchSlice.reducer;
