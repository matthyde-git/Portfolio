import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";

const TeamMember = ({ teamMember, teamLeader, projectid, reset }) => {

    // renders a single team member for a project, provides methods for the admin to remove the team member from the project

    const REMOVE_MEMBER_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_REMOVE_MEMBER_URL
            : import.meta.env.VITE_PRODUCTION_REMOVE_MEMBER_URL

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const removeTeamMember = () => {

    // creates an axios delete request to remove the team member and notify them

        const reqData = {
            projectid: projectid,
            email: teamMember.email
        }

        axios
            .delete(REMOVE_MEMBER_URL, {data: reqData})
            .then((response) => {
                toast.success("User removed successfully")
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to remove user");
            })

        const data = {
            name: teamMember.email,
            message: `You have been removed from project: ${sessionStorage.getItem("project-title")}`,
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

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const { user } = useAuth0();
        
    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else if (user.name === teamLeader)
    // renders if the user is the team leader, provides methods for removing a team member from the project
    {
        if (teamMember.email === teamLeader)
        // highlights the team leader email
        {
            return (
                <tbody>
                    <tr>
                        <td className="text-secondary" data-testid="team-leader">Team Leader: {teamMember.email}</td>
                    </tr>
                </tbody>
            )
        }
        else
        {
            return (
                <tbody>
                    <tr>
                        <td 
                            className="hover:text-primary hover:cursor-pointer"
                            onClick={() => document.getElementById(teamMember.email + "modal").showModal()}
                            >
                                {teamMember.email}
                        </td>
                    </tr>

                    <dialog id={teamMember.email + "modal"} className="modal">
                        <div className="modal-box">
                            
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                            </form>

                            {
                                showConfirmModal ? (
                                    <>
                                        <h3 className="font-bold text-lg text-center">{teamMember.email}</h3>

                                        <p className="remove-modal-text">Are you sure you want to remove this user? They will be unassigned from their tasks and removed from the project.</p>

                                        <button 
                                            className="btn btn-error remove-modal-btn"
                                            onClick={() => setShowConfirmModal(false)}
                                        >
                                            No
                                        </button>

                                        <form method="dialog">
                                            <button 
                                                className="btn btn-success remove-modal-btn-yes"
                                                data-testid={teamMember.teammemberid + "confirm-remove-user"}
                                                onClick={removeTeamMember}
                                            >
                                                Yes
                                            </button>
                                        </form>

                                    </>
                                ) : (
                                    <>
                                    <h3 className="font-bold text-lg text-center">{teamMember.email}</h3>

                                        <button 
                                            className="btn btn-error remove-user-btn"
                                            data-testid={teamMember.teammemberid + "remove-user-btn"}
                                            onClick={() => setShowConfirmModal(true)}
                                        >
                                            Remove User
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </dialog>
                    
                </tbody>
            )
        }
    }
    else
    // renders if the user is not the team leader, just displays the team members
    {
        if (teamMember.email === teamLeader)
        // highlights the team leader email
        {
            return (
                <tbody>
                    <tr>
                        <td className="text-secondary">Team Leader: {teamMember.email}</td>
                    </tr>
                </tbody>
            )
        }
        else
        {
            return (
                <tbody>
                    <tr>
                        <td>{teamMember.email}</td>
                    </tr>
                </tbody>
            )
        }
    }
};

export default TeamMember;