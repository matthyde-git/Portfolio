import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NOTIFS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_USER_NOTIFS_URL
        : import.meta.env.VITE_PRODUCTION_GET_USER_NOTIFS_URL;

const initialState = {
    name: "",
    notifications : [],
    isLoading: true,
}

export const fetchUserNotifications = createAsyncThunk(
    // fetches all of the user's notifications
    "notifications/fetchUserNotifications",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(NOTIFS_URL + sessionStorage.getItem("username"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const notificationSlice = createSlice({
    // stores the results of the fetch function as an array in the state value
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserNotifications.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserNotifications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.name = sessionStorage.getItem("username");
            state.notifications = action.payload;
        });
        builder.addCase(fetchUserNotifications.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default notificationSlice.reducer;