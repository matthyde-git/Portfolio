import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL for fetching notification data
const NOTIFICATIONS_URL = 
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_GET_NOTIFICATION_URL
    : import.meta.env.VITE_PRODUCTION_GET_NOTIFICATION_URL;

const initialState = {
    notifications: [],
    isLoading: true,
}

export const fetchNotifications = createAsyncThunk(
    "auctions/fetchNotifications",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(NOTIFICATIONS_URL);
            return response.data;
        }catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload;
        });
        builder.addCase(fetchNotifications.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default notificationSlice.reducer;