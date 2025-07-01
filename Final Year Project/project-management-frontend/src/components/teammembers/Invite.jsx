import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Invite = ({ invite, reset }) => {

    // renders a single project invite, provides methods for accepting and rejecting the invite

    const ACCEPT_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_ACCEPT_INVITE_URL
            : import.meta.env.VITE_PRODUCTION_ACCEPT_INVITE_URL;

    const REJECT_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_REJECT_INVITE_URL
            : import.meta.env.VITE_PRODUCTION_REJECT_INVITE_URL;

    const acceptInvite = () => {

        // creates an axios post request to accept the invite
        
        const data = {
            projectid: invite.projectid,
            email: invite.email
        }

        axios
            .post(ACCEPT_URL, data)
            .then((response) => {
                toast.success("Invite accepted successfully")
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to accept invite")
            })
    }

    const rejectInvite = () => {

        // creates an axios post request to reject the invite

        const data = {
            projectid: invite.projectid,
            email: invite.email
        }

        axios
            .post(REJECT_URL, data)
            .then((response) => {
                toast.success("Invite rejected successfully")
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to reject invite")
            })
    }
    
    return (
        <tbody>
            <tr className="hover:bg-primary hover:text-base-100">
                <td>{invite.title}</td>
                <td>{invite.teamleader}</td>
                <td>{invite.description}</td>
                <td>
                    {invite.deadline.slice(8, 10) + "/" + invite.deadline.slice(5, 7) + "/" + invite.deadline.slice(0, 4) + " at " + invite.deadline.slice(11, 16)}
                </td>
                <td>
                    <button 
                        className="btn btn-success btn-sm"
                        data-testid={invite.projectid + "accept-btn"}
                        onClick={() => document.getElementById(invite.projectid + "accept-modal").showModal()}>
                            Accept Invite
                        </button>
                </td>
                <td>
                    <button 
                        className="btn btn-error btn-sm"
                        data-testid={invite.projectid + "reject-btn"}
                        onClick={() => document.getElementById(invite.projectid + "reject-modal").showModal()}>
                            Reject Invite
                        </button>
                </td>
            </tr>

            <dialog id={invite.projectid + "accept-modal"} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                        </button>
                        <p>Are you sure you want to accept?</p>
                    </form>
                    <form method="dialog">
                        <button
                            className="btn btn-error invite-btn">
                                No
                        </button>
                        <button
                            className="btn btn-success invite-btn"
                            data-testid={invite.projectid + "confirm-accept-btn"}
                            onClick={acceptInvite}>
                                Yes
                        </button>
                    </form>
                </div>
            </dialog>
            <dialog id={invite.projectid + "reject-modal"} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={reset}
                            >
                                ✕
                        </button>
                        <p>Are you sure you want to reject?</p>
                    </form>
                    <form method="dialog">
                        <button
                            className="btn btn-error invite-btn">
                                No
                        </button>
                        <button
                            className="btn btn-success invite-btn"
                            data-testid={invite.projectid + "confirm-reject-btn"}
                            onClick={rejectInvite}>
                                Yes
                        </button>
                    </form>
                </div>
            </dialog>
        </tbody>
    );
};

export default Invite;