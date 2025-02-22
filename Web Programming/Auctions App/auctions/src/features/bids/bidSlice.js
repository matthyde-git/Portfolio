import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL for fetching bid data
const BIDS_URL = 
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_GET_BID_URL
    : import.meta.env.VITE_PRODUCTION_GET_BID_URL;

const initialState = {
    bids: [],
    isLoading: true,
}

export const fetchBids = createAsyncThunk(
    "auctions/fetchBids",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(BIDS_URL);
            return response.data;
        }catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const bidSlice = createSlice({
    name: "bids",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBids.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBids.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bids = action.payload;
        });
        builder.addCase(fetchBids.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default bidSlice.reducer;