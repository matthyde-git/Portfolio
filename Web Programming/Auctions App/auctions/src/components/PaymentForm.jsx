import React, { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";

import SubmitButton from "./SubmitButton";

// URL for updating the oders table
const ORDER_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_POST_ORDER_URL
        : import.meta.env.VITE_PRODUCTION_POST_ORDER_URL;

const PaymentForm = ({ hidden, winnerEmail, itemTitle, price }) => {

    const resetAllFields = () => {
        var form = document.getElementById("payment");
        form.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        console.log(entries);
        
        axios
            .post(ORDER_URL, entries)
            .then((response) => {
                console.log(response.data);
                resetAllFields();
                toast.success("Form has been submitted successfully!");
            })
            .catch((error) => {
                console.log(error);
                return toast.error(error.message);
            });
    };

    return (
        <div className="form text-center" hidden={hidden}>
            <form id="payment" onSubmit={handleSubmit}>
                <h4 className="text-center text-3xl font-bold">Make Payment</h4>

                <input  
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="email" 
                    name="email" 
                    required={true} 
                    maxLength={100} 
                    value={winnerEmail} 
                    readOnly={true}
                >
                </input>
                <br></br>
                <input  
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="item" 
                    name="item" 
                    required={true} 
                    maxLength={100} 
                    value={itemTitle} 
                    readOnly={true}>
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="number" 
                    id="price" 
                    name="price" 
                    required={true} 
                    maxLength={30} 
                    value={price} 
                    readOnly={true}>
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="firstname" 
                    name="firstname" 
                    required={true} 
                    maxLength={30}
                    placeholder="First Name">
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    required={true} 
                    maxLength={30}
                    placeholder="Last Name">
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="address" 
                    name="address" 
                    required={true} 
                    maxLength={300}
                    placeholder="Address">
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="cardnumber" 
                    name="cardnumber" 
                    required={true} 
                    minLength={16}
                    maxLength={16}
                    placeholder="Card Number (no spaces)">
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="expirydate" 
                    name="expirydate" 
                    required={true}
                    placeholder="Expiry Date (dd/mm/yyyy)">
                </input>
                <br></br>
                <input 
                    className="input input-bordered w-full max-w-xs" 
                    type="text" 
                    id="cvv" 
                    name="cvv" 
                    required={true} 
                    minLength={3}
                    maxLength={3}
                    placeholder="CVV (the 3 numbers at the back of card)">
                </input>
                <br></br>

                <SubmitButton id="form-title" text="Order"/>

            </form>
        </div>
        
    );
}

export default PaymentForm;