import { configureStore } from "@reduxjs/toolkit";

import auctionReducer from "./features/auctions/auctionSlice";
import bidReducer from "./features/bids/bidSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import orderReducer from "./features/orders/orderSlice";

export const store = configureStore({
    reducer: {
        auctions: auctionReducer,
        bids: bidReducer,
        notifications: notificationReducer,
        orders: orderReducer,
    },
});