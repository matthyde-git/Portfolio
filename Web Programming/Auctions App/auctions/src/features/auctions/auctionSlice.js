import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL for fetching auction data
const AUCTIONS_URL = 
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_GET_AUCTION_URL
    : import.meta.env.VITE_PRODUCTION_GET_AUCTION_URL;

const initialState = {
    auctions: [],
    isLoading: true,
}

export const fetchAuctions = createAsyncThunk(
    "auctions/fetchAuctions",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(AUCTIONS_URL);
            return response.data;
        }catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const auctionSlice = createSlice({
    name: "auctions",
    initialState,
    reducers: {
        getSingleAuction: (state, action) => {
            const uuid = action.payload;
            state.auctions = state.auctions.filter(
                (auction) => auction.id === uuid
            );
        },
        getAuctionsByCategory: (state, action) => {
            const category = action.payload;
            state.auctions = state.auctions.filter(
                (auction) => auction.category === category
            );
        },
        sortAuctionsByLatestDate: (state, action) => {
            state.auctions = state.auctions.reverse();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuctions.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAuctions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.auctions = action.payload;
        });
        builder.addCase(fetchAuctions.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { getSingleAuction, getAuctionsByCategory, sortAuctionsByLatestDate } = auctionSlice.actions;

export default auctionSlice.reducer;