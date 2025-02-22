import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Order from "./src/components/Orders";
import { fetchOrders } from "./src/features/orders/orderSlice";

const Orders = ({ email }) => {
    const { orders, isLoading } = useSelector((store) => store.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        /* maps the db orders to components if their email value matches the email value passed into the component*/
        <>
            <h2 id="order-title">My Orders</h2>
            <div className="orders">
                {orders.map((order) => {
                    if (order.email === email)
                    {
                        return <Order orderInfo={order} key={order.id}/>
                    }
                })}
        </div>
        </>
    );
};

export default Orders;