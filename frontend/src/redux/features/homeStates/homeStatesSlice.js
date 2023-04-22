import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {act} from "react-dom/test-utils"
import axiosInstance from "../../../api/axios"




const initialState = {
	labels: [],
	amount: [],
}


export const getStates = createAsyncThunk("getStates", async () => {
	const { data } = await axiosInstance({
		method: "GET",
		url: "/total-expenses"
	})
	return data;
})


export const homeStatesSlice = createSlice({
	name: "states",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getStates.fulfilled, (state, action) => {
			state.amount = action.payload 
			state.labels = action.payload
		})
	}
})

export default homeStatesSlice.reducer;
