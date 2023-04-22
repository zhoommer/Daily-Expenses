import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";

const initialState = {
  filteredExpenses: [],
};

export const getFilteredExpenses = createAsyncThunk("getFilteredExpenses", async (search) => {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/search/${search}`,
  });
  return data;
});


export const filteredExpensesSlice = createSlice({
  name: "filteredExpenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilteredExpenses.fulfilled, (state, action) => {
      state.filteredExpenses = action.payload;
    });
  },
});


export default filteredExpensesSlice.reducer;
