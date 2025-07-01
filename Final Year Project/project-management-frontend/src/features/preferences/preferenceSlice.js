import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PREFERENCES_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_USER_PREFERENCES_URL
        : import.meta.env.VITE_PRODUCTION_GET_USER_PREFERENCES_URL;

const initialState = {
    userPreferences: [],
    isLoading: true,
}

export const fetchUserPreferences = createAsyncThunk(
    // fetches the user's preferences
    "projects/fetchUserPreferences",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(PREFERENCES_URL + sessionStorage.getItem("username"));
            if (response.data.length > 0)
            {
                sessionStorage.setItem("theme", response.data[0].theme);
                sessionStorage.setItem("font", response.data[0].fontsize);
            }
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const preferenceSlice = createSlice({
    // stores the results of the fetch function as an array in the state value
    name: "preferences",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserPreferences.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserPreferences.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userPreferences = action.payload;
        });
        builder.addCase(fetchUserPreferences.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default preferenceSlice.reducer;