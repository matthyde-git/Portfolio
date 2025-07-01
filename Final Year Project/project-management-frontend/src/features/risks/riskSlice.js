import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const RISKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_PROJECT_RISKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_PROJECT_RISKS_URL;

const TOP_RISKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_TOP_PROJECT_RISKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_TOP_PROJECT_RISKS_URL;

const initialState = {
    risks: [],
    topRisks: [],
    isLoading: true,
}

export const fetchRisks = createAsyncThunk(
    // fetches all the risks within a project
    "files/fetchRisks",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(RISKS_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

export const fetchTopRisks = createAsyncThunk(
    // fetches the top 3 highest priority risks for a project
    "files/fetchTopRisks",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(TOP_RISKS_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

const riskSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "risks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRisks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRisks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.risks = action.payload;
        });
        builder.addCase(fetchRisks.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchTopRisks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTopRisks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.topRisks = action.payload;
        });
        builder.addCase(fetchTopRisks.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default riskSlice.reducer;