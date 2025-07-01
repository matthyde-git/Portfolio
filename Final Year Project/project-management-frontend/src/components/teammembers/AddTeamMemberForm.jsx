import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import validator from "validator";

const AddTeamMemberForm = () => {

    // form component for the team leader to invite new members

    const ADD_MEMBER_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_ADD_TEAM_MEMBER_URL
        : import.meta.env.VITE_PRODUCTION_ADD_TEAM_MEMBER_URL;

    const { user } = useAuth0();

    const resetForm = () => {
        var form = document.getElementById("project-form");
        form.reset();
    };

    const handleSubmit = (e) => {

        // creates an axios post request to invite a new team member to the project

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        
        if (validator.isEmail(entries.email))
        {
            if (entries.email === user.name)
            {
                return toast.error("Cannot invite yourself to the project");
            }

            axios
            .post(ADD_MEMBER_URL, entries)
            .then((response) => {
                toast.success("Invitation sent successfully");
                resetForm();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to send invitation");
            });
        }
        else
        {
            return toast.error("Invalid email");
        }
    }
    
    if (user !== undefined) 
    {
        return (
            <div>
                <form id="project-form" onSubmit={handleSubmit}>
    
                    <label className="form-header" htmlFor="email">User Email:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="invite-email"
                        type="text" 
                        id="email" 
                        name="email"
                        required={true} 
                        placeholder="Enter the email address of the user you want to invite"
                    >
                    </input>
    
                    <label htmlFor="projectid" hidden>ProjectID:</label>
                    <input 
                        type="number" 
                        id="projectid" 
                        name="projectid" 
                        required={true} 
                        value={sessionStorage.getItem("projectid")} 
                        readOnly={true} 
                        hidden>
                    </input>
    
                    <button className="update-form-btn btn btn-success" type="submit" data-testid="invite-btn">Invite</button>
    
                </form>
            </div>
        );
    }
};

export default AddTeamMemberForm;