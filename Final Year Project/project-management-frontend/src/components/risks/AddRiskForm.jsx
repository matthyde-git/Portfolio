import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ADD_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_ADD_PROJECT_RISK_URL
        : import.meta.env.VITE_PRODUCTION_ADD_PROJECT_RISK_URL;

const NOTIF_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
        : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

const AddRiskForm = () => {

    /* Form component for creating project risks */

    const { team } = useSelector((store) => store.team);
    

    const resetForm = () => {
    // resets the forms input fields
        var form = document.getElementById("risk-form");
        form.reset();
    };

    const handleSubmit = (e) => {

        /* Creates an axios post request with the risk information, displays a toast success or error message depending on the result */

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        axios
            .post(ADD_URL, entries)
            .then((response) => {
                toast.success("Risk created successfully");
                resetForm();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to create risk");
            });

        for (let i = 0; i < team.length; i++)
        {
            if (team[i].email !== sessionStorage.getItem("username"))
            {
                if (team[i].acceptedinvite === true)
                {
                    // sends the users that have accepted invites to the project a notification
            
                    const data = {
                        name: team[i].email,
                        message: `There are new risks in project: ${sessionStorage.getItem("project-title")}`,
                        date: new Date()
                    } 
                
                    axios
                        .post(NOTIF_URL, data)
                        .then((response) => {
                            // console.log("Notif sent successfully");
                        })
                        .catch((error) => {
                            // console.log(error);
                        });
                }
            }
        }
                
    }
    
    return (
            <div>
                <form id="risk-form" onSubmit={handleSubmit}>

                    <label className="form-header" htmlFor="projectid" hidden>ProjectID:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        type="text" 
                        id="projectid" 
                        name="projectid"
                        required={true} 
                        value={sessionStorage.getItem("projectid")}
                        hidden
                    >
                    </input>
            
                    <label className="form-header" htmlFor="title">Title:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-title"
                        type="text" 
                        id="title" 
                        name="title"
                        required={true} 
                        placeholder="Risk title"
                    >
                    </input>
            
                    <label className="form-header" htmlFor="category">Category:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-category"
                        type="text" 
                        id="category" 
                        name="category"
                        required={true} 
                        placeholder="What type of risk is it? (e.g., technology, requirements)"
                    >
                    </input>
            
                    <label className="form-header" htmlFor="impact">Impact:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-impact"
                        type="text" 
                        id="impact" 
                        name="impact"
                        required={true} 
                        placeholder="What impact would this risk have on the project?"
                    >
                    </input>

                    <label className="form-header" htmlFor="impactlevel">Impact Level:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-impact-level"
                        id="impactlevel" 
                        name="impactlevel" 
                        required={true} 
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>

                    <label className="form-header" htmlFor="likelihood">Likelihood:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-likelihood"
                        id="likelihood" 
                        name="likelihood" 
                        required={true} 
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>

                    <label className="form-header" htmlFor="control">Control:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-success"
                        data-testid="add-risk-control"
                        id="control" 
                        name="control"
                        rows={8}
                        cols={64}
                        required={true}
                        placeholder="How will the risk be controlled throughout the project?"
                    >
                    </textarea>

                    <label className="form-header" htmlFor="response">Response:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-success"
                        data-testid="add-risk-response"
                        id="response" 
                        name="response"
                        rows={8}
                        cols={64}
                        required={true}
                        placeholder="What will we do if the risk occurs?"
                    >
                    </textarea>

                    <label className="form-header" htmlFor="priority">Priority:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="add-risk-priority"
                        id="priority" 
                        name="priority" 
                        required={true} 
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>
            
                    <button className="update-form-btn btn btn-success" data-testid="add-risk-btn" type="submit">Create</button>
            
                </form>
            </div>
    );
};

export default AddRiskForm;