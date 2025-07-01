import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import links from "./navBarData";

import UserContainer from "./UserContainer";
import Assistant from "./Assistant.jsx";

import { fetchUserNotifications } from "../../features/notifications/notificationSlice.js";

const NavBar = () => {

    const { isAuthenticated, logout, user } = useAuth0();

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    };

    const navigateToNotifications = () => {
        navigate("/notifications");
    };

    const navigateToUserGuide = () => {
        navigate("/guide");
    };

    const { notifications, isLoading } = useSelector((store) => store.notifications);
            
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserNotifications());
    }, []);

    const refreshNotifs = () => {
            dispatch(fetchUserNotifications());
        }
    
    useEffect(() => {
        // useEffect hook re-fetches the projects notifs every 30 seconds to display any new notifs since the last render
        let interval = setInterval(() => {
            refreshNotifs()
        }, 30000);
    
        return () => {
            clearInterval(interval);
        }
    }, []);

        return (
            <div id="navBar" className="navbar bg-base-100">
                <div className="navbar-start">
                    <div id="nav-drawer" className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn drawer-button">
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
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-30 p-4">
                                {links.map((link) => {
                                    const { id, url, text } = link;
                                    return (
                                        <li key={id}>
                                            <NavLink to={url} data-testid={text + "-menu-link"}>{text}</NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <a  className="btn btn-ghost text-xl"
                        onClick={() => {navigateToHome()}}>
                            Project Management App
                    </a>
                </div>
                <div className="navbar-end">

                <button className="btn btn-ghost btn-circle nav-icon"
                        onClick={()=>document.getElementById("assistant-modal").showModal()}>
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
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                </button>

                
                <button className="btn btn-ghost btn-circle nav-icon"
                        onClick={navigateToUserGuide}>
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
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>

                    {
                        notifications.length < 1 ? (
                            <button className="btn btn-ghost btn-circle nav-icon"
                                    onClick={navigateToNotifications}>
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
                            </button>
                        ) : (
                            <button className="btn btn-ghost btn-circle nav-icon"
                                    onClick={navigateToNotifications}>
                                <div className="indicator">
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
                                    <span className="badge badge-xs badge-primary indicator-item" data-testid="notif-indicator">{notifications.length}</span>
                                </div>
                            </button>
                        )
                    }

                    <dialog id="assistant-modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <Assistant />
                        </div>
                    </dialog>
                    
                    <UserContainer user={user} logout={logout} />

                </div>
            </div>
        );
};

export default NavBar;