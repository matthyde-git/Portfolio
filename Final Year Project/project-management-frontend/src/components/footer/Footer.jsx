import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const CONTACT_URL = 
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_ADD_CONTACTS_URL
        : import.meta.env.VITE_PRODUCTION_ADD_CONTACTS_URL;

const Footer = () => {

    const navigate = useNavigate();

    const navigateToUserGuide = () => {
        navigate("/guide");
    };

    const resetForm = () => {

        var form = document.getElementById("form");

        form.reset();
    };

    const handleSubmit = (e) => {

        /* 
            sends the user's email address to the contacts backend, 
            toast success or failure messages are displayed at the screen to inform the user of the result
        */

        e.preventDefault();

        const emailString = document.getElementById("email").value;

        if (validator.isEmail(emailString))
        // isEmail function from the validator package returns true if the user's input is a valid email address, false otherwise
        {
            const emailObj = {
                email: emailString
            }
    
            axios
                .post(CONTACT_URL, emailObj)
                .then((response) => {
                    resetForm();
                    toast.success("Email has been submitted successfully");
                })
                .catch((error) => {
                    // console.log(error);
                    return toast.error(error.message);
                });
        }
        else
        {
            return toast.error("Invalid email address");
        }
    };

    const { isAuthenticated } = useAuth0();

    // footer is only displayed if the user is signed in
    if (isAuthenticated === true)
    {
        return (
            <footer id="footer" className="footer bg-base-200 text-base-content p-3">

                <nav id="footer-section" className="md:justify-self-start">
                    <h6 className="footer-title">Application</h6>
                    <p>Project Management App</p>
                    <p>Matt Hyde 2025</p>
                </nav>

                <nav className="md:justify-self-center">
                    <h6 className="footer-title">Training</h6>
                    <a data-testid="user-guide-btn" className="link link-hover" onClick={navigateToUserGuide}>User Guide</a>
                    <a className="link link-hover" onClick={() => document.getElementById("assistant-modal").showModal()}>Ask a Question</a>
                </nav>

                <form className="md:justify-self-end" id="form" onSubmit={handleSubmit}>

                    <h6 className="footer-title">Need Help? Enter Your email below</h6>

                    <fieldset className="form-control w-80">

                        <div className="join">
                            <input
                                type="text"
                                id="email"
                                data-testid="email"
                                placeholder="username@site.com"
                                required={true}
                                className="input input-bordered join-item" />

                            <button 
                                className="btn btn-primary join-item"
                                id="submit-btn"
                                data-testid="submit-btn"
                                type="submit">
                                    Contact Us
                            </button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        );
    }
};

export default Footer;