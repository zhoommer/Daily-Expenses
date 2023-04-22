import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const handleChangeSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleChange: (state, actions) => {
      state.search = actions.payload;
    },
  },
});

export const { handleChange } = handleChangeSlice.actions;

export default handleChangeSlice.reducer;
