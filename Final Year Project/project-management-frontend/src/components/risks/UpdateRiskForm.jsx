import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UPDATE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_UPDATE_PROJECT_RISK_URL
        : import.meta.env.VITE_PRODUCTION_UPDATE_PROJECT_RISK_URL;

const UpdateRiskForm = ({ risk, cancel }) => {

    /* Component for a form that lets the user update a risk */

    const resetForm = () => {
        var form = document.getElementById("risk-update-form");
        form.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        axios
            .post(UPDATE_URL, entries)
            .then((response) => {
                toast.success("Risk updated successfully");
                resetForm(); 
            })
            .catch((error) => {
                // console.log(error);
                return toast.error(error.message);
            });
    }
    
    return (
            <div>
                <form id="risk-update-form" onSubmit={handleSubmit}>

                    <label className="form-header" htmlFor="riskid" hidden>RiskID:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-warning w-full"
                        type="text" 
                        id="riskid" 
                        name="riskid"
                        required={true} 
                        defaultValue={risk[0]}
                        hidden
                    >
                    </input>

                    <label className="form-header" htmlFor="projectid" hidden>ProjectID:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-warning w-full"
                        type="text" 
                        id="projectid" 
                        name="projectid"
                        required={true} 
                        defaultValue={risk[1]}
                        hidden
                    >
                    </input>
            
                    <label className="form-header" htmlFor="title">Title:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-title"}
                        type="text" 
                        id="title" 
                        name="title"
                        required={true} 
                        defaultValue={risk[2]}
                    >
                    </input>
            
                    <label className="form-header" htmlFor="category">Category:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-category"}
                        type="text" 
                        id="category" 
                        name="category"
                        required={true} 
                        defaultValue={risk[3]}
                    >
                    </input>
            
                    <label className="form-header" htmlFor="impact">Impact:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-impact"}
                        type="text" 
                        id="impact" 
                        name="impact"
                        required={true} 
                        defaultValue={risk[4]}
                    >
                    </input>

                    <label className="form-header" htmlFor="impactlevel">Impact Level:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-impact-level"}
                        id="impactlevel" 
                        name="impactlevel" 
                        required={true}
                        defaultValue={risk[5]}
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>

                    <label className="form-header" htmlFor="likelihood">Likelihood:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-likelihood"}
                        id="likelihood" 
                        name="likelihood" 
                        required={true}
                        defaultValue={risk[6]}
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>

                    <label className="form-header" htmlFor="control">Control:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-warning"
                        data-testid={risk[0] + "update-risk-control"}
                        id="control" 
                        name="control"
                        rows={8}
                        cols={181}
                        required={true}
                        defaultValue={risk[7]}
                    >
                    </textarea>

                    <label className="form-header" htmlFor="response">Response:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-warning"
                        data-testid={risk[0] + "update-risk-response"}
                        id="response" 
                        name="response"
                        rows={8}
                        cols={181}
                        required={true}
                        defaultValue={risk[8]}
                    >
                    </textarea>

                    <label className="form-header" htmlFor="priority">Priority:</label> <br></br>
                    <select 
                        className="form-section input input-bordered input-warning w-full"
                        data-testid={risk[0] + "update-risk-priority"}
                        id="priority" 
                        name="priority" 
                        required={true}
                        defaultValue={risk[9]}
                    >
                        <option value={1}>1 (very low)</option>
                        <option value={2}>2 (low)</option>
                        <option value={3}>3 (moderate)</option>
                        <option value={4}>4 (high)</option>
                        <option value={5}>5 (very high)</option>
                    </select>

                    <button 
                        className="btn btn-error cancel-update-risk-btn"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
            
                    <button className="update-risk-btn btn btn-warning" data-testid={risk[0] + "update-risk-form-btn"}type="submit">Update</button>
            
                </form>
            </div>
    );
};

export default UpdateRiskForm;