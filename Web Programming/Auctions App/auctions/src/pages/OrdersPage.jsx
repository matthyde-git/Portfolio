import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Orders from "../../Orders";

const UPDATE_ORDER_URL =
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_UPDATE_ORDER_URL
    : import.meta.env.VITE_PRODUCTION_UPDATE_ORDER_URL;

const OrdersPage = () => {

    const { isAuthenticated, user } = useAuth0();

    if (isAuthenticated === true)
    {
        return (
            <>
                <Orders email={user.name} />
            </>
        );
    }
    else {
        return (
            // shown if the user is not logged in
            <h1 id="orders-header">Login to see orders</h1>
        );
    }
    
}

export default OrdersPage;