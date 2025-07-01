import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const MESSAGES_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_PROJECT_MESSAGES_URL
        : import.meta.env.VITE_PRODUCTION_GET_PROJECT_MESSAGES_URL;

const RECENT_MESSAGES_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_RECENT_PROJECT_MESSAGES_URL
        : import.meta.env.VITE_PRODUCTION_GET_RECENT_PROJECT_MESSAGES_URL;

const initialState = {
    messages: [],
    recentMessages: [],
    isLoading: true,
}

export const fetchMessages = createAsyncThunk(
    // fetches all the messages for a project
    "messages/fetchMessages",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(MESSAGES_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

export const fetchRecentMessages = createAsyncThunk(
    // fetches the 3 messages that were most recently posted to a project
    "messages/fetchRecentMessages",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(RECENT_MESSAGES_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

const messageSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
        });
        builder.addCase(fetchMessages.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchRecentMessages.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRecentMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.recentMessages = action.payload;
        });
        builder.addCase(fetchRecentMessages.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default messageSlice.reducer;