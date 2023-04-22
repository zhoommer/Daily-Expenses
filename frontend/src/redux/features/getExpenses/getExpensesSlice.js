import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";

const initialState = {
  expenses: [],
  pageSize: [],
};

export const getExpenses = createAsyncThunk("getExpenses", async (page) => {
   const { data } = await axiosInstance({
    method: "GET",
    url: `/list/${parseInt(page)}`,
  });
  return data;
});

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });
  },
});

export default expensesSlice.reducer;
