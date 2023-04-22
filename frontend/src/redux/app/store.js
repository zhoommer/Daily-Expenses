import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/paginationPage/paginationPagesSlice";
import searchReducer from "../features/searchInput/searchInputSlice";
import filteredExpensesSlice from "../features/filteredExpenses/filteredExpensesSlice";
import expensesSlice from "../features/getExpenses/getExpensesSlice";
import homeStatesSlice from "../features/homeStates/homeStatesSlice";


export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
    filteredExpenses: filteredExpensesSlice,
    page: pageReducer,
    search: searchReducer,
	homeState: homeStatesSlice
  },
});
