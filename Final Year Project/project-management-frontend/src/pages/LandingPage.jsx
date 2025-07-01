import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import projectImage from "../assets/projects.jpg";
import messageImage from "../assets/messages.jpg";
import settingsImage from "../assets/settings.jpg";
import tasksImage from "../assets/todo-lists.jpg";

import { fetchUserPreferences } from "../features/preferences/preferenceSlice.js";

const LandingPage = () => {

    /* 
        This page is shown to the user when they first access the site, if the user is not signed in it renders a welcome message and sign in button,
        if they are signed in, their settings preferences will be loaded and they will be shown cards containing the app information
    */

    const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();

    const navigate = useNavigate();

    const navigateToProjects = () => {
        navigate("/projects");
    };

    const navigateToNotifications = () => {
        navigate("/notifications");
    };

    const navigateToSettings = () => {
        navigate("/settings");
    };

    const navigateToTasks = () => {
        navigate("/tasks");
    };

    const { userPreferences } = useSelector((store) => store.preferences);
        
    const dispatch = useDispatch();

    if (isAuthenticated === false)
    {
        useEffect(() => {
            /* useEffect needs to be called before the user is signed in and the main content is rendered, as you can't increase the number of hooks called in a new render */
            dispatch(fetchUserPreferences());
        }, []);

        /* Displays the welcome info before sign in */
        return (
            <div
                className="hero h-screen w-screen"
                style={{
                    backgroundImage: `url(${projectImage})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div>
                        <h1 id="welcome-title" className="mb-5 text-5xl font-bold">Welcome to the App</h1>
                        <p id="welcome-message" className="mb-5 bg-base-100 text-primary">
                            This site requires 3rd party cookies, please make sure they are enabled in your browser before continuing.
                        </p>
                        <button onClick={loginWithRedirect} className="btn btn-primary border-base-100" id="welcome-btn">Login or Signup to get started</button>
                    </div>
                </div>
            </div>
        
        );
    }
    else
    {
        sessionStorage.setItem("username", user.name);

        useEffect(() => {
            dispatch(fetchUserPreferences());
        }, []);

        /* Updates the CSS settings if the user has preferences save in the database*/
        if ((userPreferences.length > 0) && (userPreferences[0].user === user.name))
        {
            const root = document.getElementsByTagName("html")[0];
            const app = document.getElementsByClassName("app")[0];
        
            root.style.fontSize = userPreferences[0].fontsize;
            app.setAttribute("data-theme", userPreferences[0].theme);
        }
    
        /* Renders the main landing page content after sign in */
        return (
            <div
                className="hero h-screen w-screen"
                style={{
                    backgroundImage: `url(${projectImage})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center">      
                    <div className="landing-content" id="landing-page-test">

                        <div className="landing-item card bg-base-100 card-bordered border-primary w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                src={projectImage}
                                alt="projects"
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Projects</h2>
                                <p>Manage your projects</p>
                                <div className="card-actions">
                                <button className="btn btn-primary" id="to-prj-btn" onClick={() => {navigateToProjects()}}>To Projects</button>
                                </div>
                            </div>
                        </div>

                        <div className="landing-item card bg-base-100 card-bordered border-primary w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                src={tasksImage}
                                alt="tasks"
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Tasks</h2>
                                <p>View all your tasks</p>
                                <div className="card-actions">
                                <button className="btn btn-primary" data-testid="to-tasks" onClick={() => {navigateToTasks()}}>To Tasks</button>
                                </div>
                            </div>
                        </div>

                        <div className="landing-item card bg-base-100 card-bordered border-primary w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                src={messageImage}
                                alt="messages"
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Notifications</h2>
                                <p>View your notifications</p>
                                <div className="card-actions">
                                <button className="btn btn-primary" data-testid="to-notifs" onClick={() => {navigateToNotifications()}}>To Notifications</button>
                                </div>
                            </div>
                        </div>

                        <div className="landing-item card bg-base-100 card-bordered border-primary w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                src={settingsImage}
                                alt="messages"
                                className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Settings</h2>
                                <p>Update your user settings</p>
                                <div className="card-actions">
                                <button className="btn btn-primary" data-testid="to-settings" onClick={() => {navigateToSettings()}}>To Settings</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    };
};

export default LandingPage;