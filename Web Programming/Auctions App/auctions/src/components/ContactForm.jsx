import React, { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";

const CONTACT_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CONTACT_URL
        : import.meta.env.VITE_PRODUCTION_CONTACT_URL;

const ContactForm = () => {

    const resetAllFields = () => {
        var form = document.getElementById("newsletter");
        form.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        console.log(entries);

        axios
            .post(CONTACT_URL, entries)
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
        <div className="contact-form">
            <div className="container2">
                <h2 className="contact">Contact us</h2>

                <p>Please feel free to fill out the form below to get in contact with our team on any suggestions/queries 
                    you may have about our website or a particular auction you took part in. We look forward to hearing from you!</p>
                
                <form id="newsletter" onSubmit={handleSubmit}>


                <div className="container3">
                    <label htmlFor="firstname">First Name :</label><br></br>
                    <input type="text" id="firstname" name="firstname" required={true} maxLength={30}></input><br></br>
                </div>

                <div className="container3">
                    <label htmlFor="lastname">Last Name :</label><br></br>
                    <input type="text" id="lastname" name="lastname" required={true} maxLength={30}></input><br></br>
                </div>

                <div className="container3">
                    <label htmlFor="email">Email :</label><br></br>
                    <input type="text" id="email" name="email" required={true} maxLength={50}></input><br></br>
                </div>

                <div className="container3">
                    <label htmlFor="message">Message : </label><br></br>
                    <input type="text" id="message" name="message" required={true} maxLength={300}></input><br></br>
                </div>

                <div className="containerbtn">
                    <input type="submit" id="btn" name="btn" value="Subscribe"></input>
                </div>
            </form>
            </div>
        </div>
        
    );
};

export default ContactForm;