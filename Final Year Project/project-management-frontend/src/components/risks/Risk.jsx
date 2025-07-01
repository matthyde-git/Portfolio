import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";

import UpdateRiskForm from "./UpdateRiskForm.jsx";

const Risk = ( { risk, refresh }) => {

    /* Renders a single project risk */

    const DELETE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_DELETE_PROJECT_RISK_URL
        : import.meta.env.VITE_PRODUCTION_DELETE_PROJECT_RISK_URL;

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDelete = () => {

        /* Creates an axios delete request to delete the risk */

        const id = {
            riskid: risk[0]
        }

        axios
            .delete(DELETE_URL, {data: id})
            .then((response) => {
                toast.success("Risk deleted successfully");
                refresh();
            })
            .catch((error) => {
                console.log(error);
                return toast.error("Failed to delete risk");
            })
    }

    const { user } = useAuth0();
    
    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else if (user.name === sessionStorage.getItem("teamleader"))
    {
    /* Renders if the user is the team leader, provides a method for deleting risks */
        return (
            <>
                <tbody data-testid={risk[0] + "item"}>
                    <tr 
                        className="hover:bg-primary hover:text-base-100"
                        onClick={() => document.getElementById(risk[0] + "risk-modal").showModal()}
                        >
                            {
                                risk[2].length < 50 ? (
                                    <>
                                        <td data-testid={risk[0] + "risk-title"}>{risk[2]}</td>
                                    </>
                                ) : (
                                    <>
                                        <td data-testid={risk[0] + "risk-title"}>{risk[2].slice(0, 50) + "..."}</td>
                                    </>
                                )
                            }
                
                            <td>{risk[3]}</td>
                            <td>{risk[4]}</td>
                            <td>{risk[5]}</td>
                            <td>{risk[6]}</td>

                            {
                                risk[7].length < 50 ? (
                                    <>
                                        <td>{risk[7]}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{risk[7].slice(0, 50) + "..."}</td>
                                    </>
                                )
                            }

                            {
                                risk[8].length < 50 ? (
                                    <>
                                        <td>{risk[8]}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{risk[8].slice(0, 50) + "..."}</td>
                                    </>
                                )
                            }

                            <td>{risk[9]}</td>
                    </tr>
                </tbody>
    
                <dialog id={risk[0] + "risk-modal"} className="modal">
                        <div className="modal-box w-11/12 max-w-7xl">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={refresh}
                                    >
                                        ✕
                                    </button>
                            </form>

                            {
                                showDeleteConfirmation ? (
                                    <>
                                        <p>Are you sure you want to delete this risk? This cannot be undone.</p>

                                        <button 
                                            className="btn btn-error risk-no-btn"
                                            onClick={() => setShowDeleteConfirmation(false)}
                                            >
                                                No
                                        </button>
                                                        

                                        <form className="delete-modal-btn" method="dialog">
                                            <button 
                                                className="btn btn-success risk-confirm-btn"
                                                data-testid={risk[0] + "confirm-delete-risk"}
                                                onClick={handleDelete}
                                            >
                                                Yes
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        {
                                            showUpdateForm ? (
                                                <>
                                                    <UpdateRiskForm risk={risk} cancel={() => setShowUpdateForm(false)} />
                                                    {/* <button 
                                                        className="btn btn-error cancel-update-risk-btn"
                                                        onClick={() => setShowUpdateForm(false)}
                                                    >
                                                        Cancel
                                                    </button> */}
                                                </>
                                            ) : (
                                                <> 
                                                    <table className="table">

                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Category</th>
                                                                <th>Impact</th>
                                                                <th>Impact Level (1 - 5)</th>
                                                                <th>Likelihood (1 - 5)</th>
                                                                <th>Control</th>
                                                                <th>Response Strategy</th>
                                                                <th>Priority (1 - 5)</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr>
                                                                <td>{risk[2]}</td>
                                                                <td>{risk[3]}</td>
                                                                <td>{risk[4]}</td>
                                                                <td>{risk[5]}</td>
                                                                <td>{risk[6]}</td>
                                                                <td>{risk[7]}</td>
                                                                <td>{risk[8]}</td>
                                                                <td>{risk[9]}</td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                    
                                                    
                                                    <button 
                                                        className="btn btn-warning risk-modal-btn"
                                                        data-testid={risk[0] + "update-risk-btn"}
                                                        onClick={() => setShowUpdateForm(true)}
                                                        >
                                                            Update
                                                    </button>
                            
                                                    <button 
                                                        className="btn btn-error risk-modal-btn"
                                                        data-testid={risk[0] + "delete-risk-btn"}
                                                        onClick={() => setShowDeleteConfirmation(true)}
                                                        >
                                                            Delete
                                                    </button>
                                                    
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
    
                    </div>
                </dialog>
            </>
            
        );
    }
    return (
    /* Renders if the user is not the team leader, just displays the risk */
        <>
            <tbody>
                <tr 
                    className="hover:bg-primary hover:text-base-100"
                    onClick={() => document.getElementById(risk[0] + "risk-modal").showModal()}
                    >
                        <td>{risk[2]}</td>
                        <td>{risk[3]}</td>
                        <td>{risk[4]}</td>
                        <td>{risk[5]}</td>
                        <td>{risk[6]}</td>
                        <td>{risk[7]}</td>
                        <td>{risk[8]}</td>
                        <td>{risk[9]}</td>
                </tr>
            </tbody>
        </>
        
    );
};

export default Risk;