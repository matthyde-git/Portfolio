import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FILES_URL = import.meta.env.VITE_GET_FILE_URL;

const initialState = {
    files: [],
    isLoading: true,
}

export const fetchFiles = createAsyncThunk(
    // fetches all the files for a project
    "files/fetchFiles",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(FILES_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

const fileSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFiles.pending, (state) => {
            state.isLoading = true;
            state.files = [];
        });
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.files = action.payload;
        });
        builder.addCase(fetchFiles.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default fileSlice.reducer;