import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL for fetching order data
const ORDERS_URL = 
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_GET_ORDER_URL
    : import.meta.env.VITE_PRODUCTION_GET_ORDER_URL;

const initialState = {
    orders: [],
    isLoading: true,
}

export const fetchOrders = createAsyncThunk(
    "auctions/fetchOrders",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(ORDERS_URL);
            return response.data;
        }catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default orderSlice.reducer;