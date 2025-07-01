import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Notification from "./Notification.jsx";

import { fetchUserNotifications } from "../../features/notifications/notificationSlice.js";

const DELETE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_DELETE_USER_NOTIFS_URL
        : import.meta.env.VITE_PRODUCTION_DELETE_USER_NOTIFS_URL;

const Notifications = () => {

    const navigate = useNavigate();
          
    const navigateToHome = () => {
        navigate("/");
    };
        
    const navigateToNotifications = () => {
        navigate("/notifications");
    };

    const { notifications, isLoading } = useSelector((store) => store.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserNotifications());
    }, []);

    const reloadNotifs = () => {
        dispatch(fetchUserNotifications());
    };

    const clearNotifs = () => {

        const reqData = {
            name: sessionStorage.getItem("username")
        }

        axios
            .delete(DELETE_URL, {data: reqData})
            .then((response) => {
                toast.success("Notifications cleared successfully")
                reloadNotifs();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to clear notifications");
            })
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
    /*
        renders the users notifications, if there are any, an icon will be displayed over the bell button in the navbar with the number of notifications,
        this is to keep the user informed about their notifications. Also provides methods for the user to delete their notifications.
    */
        <>
            <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm" data-testid="notifs-breadcrumbs">
                <ul>
                    <li>
                        <a onClick={navigateToHome}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a onClick={navigateToNotifications}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            Notifications
                        </a>
                    </li>
                </ul>
            </div>

            <span className="badge badge badge-warning indicator-item back-btn hover:cursor-pointer" onClick={navigateToHome}>

                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="h-5 w-5">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                Back to home

            </span>  

            <div className="box bg-base-100 card-bordered border-primary overflow-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Date</th>

                            {
                                notifications.length > 0 ? (
                                    <th>
                                        <button 
                                            className="btn btn-error btn-sm notif-clear-btn"
                                            data-testid="clear-all-btn"
                                            onClick={() => document.getElementById("delete-modal").showModal()}>
                                                Clear All
                                        </button>
                                    </th>
                                ) : (
                                    <>  
                                    </>
                                )
                            }

                        </tr>
                    </thead>

                    {
                        notifications.length > 0 ? (
                            <>
                                {notifications.map((notification) => {
                                    return (
                                        <>
                                            <Notification notification={notification} refresh={reloadNotifs} />
                                        </>
                                    )
                                })}

                            </>
                        ) : (
                            <tbody>
                                <tr>
                                    <td className="project-text">No notifications at the moment</td>
                                </tr>
                            </tbody>
                        )
                    }

                </table>
                
                <dialog id={"delete-modal"} className="modal">
                    <div className="modal-box">
                                
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                        </form>

                        <p className="remove-modal-text">Are you sure you want to clear your notifications? This cannot be undone.</p>

                        <form method="dialog">
                            <button className="btn btn-error notif-confirm-btn">No</button>
                            <button 
                                className="btn btn-success notif-confirm-btn"
                                onClick={clearNotifs}
                            >
                                Yes
                            </button>
                        </form>

                    </div>
                </dialog>
            </div>
        </>
        
    );
};

export default Notifications;