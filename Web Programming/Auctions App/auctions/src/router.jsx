import { createBrowserRouter } from "react-router-dom";

import {
    LandingPage,
    AuctionsPage,
    ContactPage,
    HomeLayoutPage,
    ErrorPage,
    OrdersPage,
} from "./pages/index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "/auctions",
                element: <AuctionsPage />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
            {
                path: "/orders",
                element: <OrdersPage />,
            },
        ],
    },
]);