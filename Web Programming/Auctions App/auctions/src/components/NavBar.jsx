import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";

import links from "./navbarData";
import UserContainer from "./UserContainer";

import Notification from "../auctions/Notification";
import { fetchNotifications } from "../features/notifications/notificationSlice";

const NavBar = () => {

    const { notifications } = useSelector((store) => store.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);

    const updateNotifications = () => {
        dispatch(fetchNotifications());
    };

    const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

    // console.log({
    //     isAuthenticated,
    //     user,
    //     isLoading
    // });

    // URL for deleting a user's notifications
    const CLEAR_NOTIFS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CLEAR_NOTIFICATION_URL
        : import.meta.env.VITE_PRODUCTION_CLEAR_NOTIFICATION_URL;

    const clearNotifications = () => {
    /* clears the notifications db of all entries belonging to the user */    

        // formating the request data
        const userEmail = {
            email: user.name
        }

        axios
            .post(CLEAR_NOTIFS_URL, userEmail)
            .then((response) => {
                console.log(response.data);
                toast.success("Notifications cleared");
            })
            .catch((error) => {
                console.log(error);
                return toast.error(error.message);
            });
    }

    const navigate = useNavigate();

    const navigateToHome = () => {
        // called when clicking the title to navigate the user to the home page
        navigate("/");
    };

    if (isAuthenticated === true)
    /* This version of the navbar is show when the user is signed in, it allows them to check their notifications and see user information */
    {
        return (
            <div id="navBar" className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links.map((link) => {
                                const { id, url, text } = link;
                                return (
                                    <li key={id}>
                                    <NavLink to={url}>{text}</NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a onClick={() => {navigateToHome()}} className="btn btn-ghost text-xl">Bidding App</a>
                </div>
                <div className="navbar-end">

                    <div className="dropdown">
                        <div onClick={updateNotifications} tabIndex={0} role="button" className="indicator">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="notifications menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {notifications.map((notification) => {
                                    if (notification.email === user.name)
                                    {
                                        return <Notification notificationInfo={notification} key={notification.id} />
                                    }
                                })}
                                <button onClick={() => {clearNotifications()}} className="btn btn-error">Clear</button>
                        </ul>
                    </div>

                    <div>
                        <UserContainer user={user} logout={logout} login={loginWithRedirect} />
                    </div>
                </div>
            </div>
        );
    }
    else
    /* this version is shown when the user is not signed in */
    {
        return (
            <div id="navBar" className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links.map((link) => {
                                const { id, url, text } = link;
                                return (
                                    <li key={id}>
                                    <NavLink to={url}>{text}</NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a onClick={() => {navigateToHome()}} className="btn btn-ghost text-xl">Bidding App</a>
                </div>
                <div className="navbar-end">
                    <div>
                        <UserContainer user={user} logout={logout} login={loginWithRedirect} />
                    </div>
                </div>
            </div>
        );
    }
        
};

export default NavBar;