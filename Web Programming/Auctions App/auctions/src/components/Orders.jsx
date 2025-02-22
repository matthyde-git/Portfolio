import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import SubmitButton from "./SubmitButton";

const Order = ({ orderInfo }) => {

    // URL for updating the order address
    const UPDATE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_UPDATE_ORDER_URL
        : import.meta.env.VITE_PRODUCTION_UPDATE_ORDER_URL;

    const { item, price, firstname, lastname, address, created_at } = orderInfo;

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [latestAddress, setLatestAddress] = useState(address);

    const formatDate = () => {
        // makes the order date easier to read
        const date = new Date(created_at);

        return `${date}`;
    };

    const updateAddress = (e) => {
        // gets the form data and posts the request to change the address in the orders table
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        console.log("entries : " + entries.item);

        axios
            .post(UPDATE_URL, entries)
            .then((response) => {
                console.log(response);
                setLatestAddress(entries.address);
                setShowUpdateForm(false);
                toast.success("Address updated successfully!");
            })
            .catch((error) => {
                console.log(error);
                return toast.error(error.message);
            });
    }

    if (showUpdateForm === false)
    {
        return (
            <div className="grid-order-item card card-compact bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{item}</h2>
                    <p>Price: £{price}</p>
                    <p>Name: {firstname} {lastname}</p>
                    <p>Devlivery Address: {latestAddress}</p>
                    <p>Date: {formatDate()}</p>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => {setShowUpdateForm(true)}}>Update Address</button>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="grid-order-item card card-compact bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-center">Update Delivery Address</h2>
                    <br></br>
                    <div className="form text-center">
                        <form id="update" onSubmit={updateAddress}>

                            <label htmlFor="item" hidden={true}>Item : </label>
                            <input className="input input-bordered w-full max-w-xs" type="text" id="item" name="item" required={true} value={item} readOnly={true} hidden={true}></input>

                            <label htmlFor="address">New Address : </label>
                            <input className="input input-bordered w-full max-w-xs" type="text" id="address" name="address" required={true} placeholder="Address"></input>  

                            <br></br>
                            <br></br>

                            <button className="cancel-btn btn btn-error" onClick={() => {setShowUpdateForm(false)}}>Cancel</button>
                            <SubmitButton className="order-btn" id="form-title" text="Update" /> 

                        </form>
                    </div>
                </div>
            </div>
        )
    }
    
};

export default Order;