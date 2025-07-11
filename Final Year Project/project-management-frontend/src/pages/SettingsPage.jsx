import React from "react";
import { useNavigate } from "react-router-dom";

import ThemeSettings from "../components/settings/ThemeSettings";
import FontSettings from "../components/settings/FontSettings";

import projectImage from "../assets/projects.jpg"

const SettingsPage = () => {

    /* Contains the settings components */

    const navigate = useNavigate();
    
    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <div
            className="hero h-screen w-screen"
            style={{
                backgroundImage: `url(${projectImage})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            
            <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm" data-testid="settings-breadcrumbs">
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
                        <a>
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
                            Settings
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

            <ThemeSettings />
            <FontSettings />
        </div>
    );
};

export default SettingsPage;