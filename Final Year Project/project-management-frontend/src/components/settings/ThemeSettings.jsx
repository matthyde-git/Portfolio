import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import { fetchUserPreferences } from "../../features/preferences/preferenceSlice.js";

const ThemeSettings = () => {

    /* Component for the font settings, checks if the user has preferences set and updates them if the click one of the options */

    const app = document.getElementsByClassName("app")[0];

    const { userPreferences } = useSelector((store) => store.preferences);

    const dispatch = useDispatch();
    
    const refresh = () => {
        dispatch(fetchUserPreferences());
    };

    const { user } = useAuth0();

    if (user !== undefined)
    {
        const [isLight, setIsLight] = useState((userPreferences.length > 0) && (userPreferences[0].theme === "light") && (userPreferences[0].user === user.name));
        const [isDark, setIsDark] = useState((userPreferences.length > 0) && (userPreferences[0].theme === "dark") && (userPreferences[0].user === user.name));
        const [isTol, setIsTol] = useState((userPreferences.length > 0) && (userPreferences[0].theme === "tol") && (userPreferences[0].user === user.name));
        const [isWong, setIsWong] = useState((userPreferences.length > 0) && (userPreferences[0].theme === "wong") && (userPreferences[0].user === user.name));

    const UPDATE_THEME_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_THEME_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_THEME_URL;

    const ADD_PREFS_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_PREFERENCES_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_PREFERENCES_URL;

    const setToLightMode = () => {

        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newTheme: "light"
                }
    
                axios
                .post(UPDATE_THEME_URL, data)
                .then((response) => {
                    setIsLight(true);
                    setIsDark(false);
                    setIsTol(false);
                    setIsWong(false);
                    app.setAttribute("data-theme", "light");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "light",
                    fontsize: "medium"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsLight(true);
                    setIsDark(false);
                    setIsTol(false);
                    setIsWong(false);
                    app.setAttribute("data-theme", "light");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
    };

    const setToDarkMode = () => {
        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newTheme: "dark"
                }
    
                axios
                .post(UPDATE_THEME_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(true);
                    setIsTol(false);
                    setIsWong(false);
                    app.setAttribute("data-theme", "dark");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "dark",
                    fontsize: "medium"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(true);
                    setIsTol(false);
                    setIsWong(false);
                    app.setAttribute("data-theme", "dark");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
    };

    const setToTolMode = () => {
        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newTheme: "tol"
                }
    
                axios
                .post(UPDATE_THEME_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(false);
                    setIsTol(true);
                    setIsWong(false);
                    app.setAttribute("data-theme", "tol");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "tol",
                    fontsize: "medium"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(false);
                    setIsTol(true);
                    setIsWong(false);
                    app.setAttribute("data-theme", "tol");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
    };

    const setToWongMode = () => {
        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newTheme: "wong"
                }
    
                axios
                .post(UPDATE_THEME_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(false);
                    setIsTol(false);
                    setIsWong(true);
                    app.setAttribute("data-theme", "wong");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "wong",
                    fontsize: "medium"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsLight(false);
                    setIsDark(false);
                    setIsTol(false);
                    setIsWong(true);
                    app.setAttribute("data-theme", "wong");
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update theme");
                })
            }
    };

    
        return (
            <div id="theme-settings" className="bg-base-100 card-bordered border-primary" data-testid="theme-settings">
    
                <h1 className="text-center" id="setting-title">Theme Settings</h1>
    
                <p className="setting-header">Standard Themes</p>
    
                <div className="form-control">
                    <label className="setting-item label label cursor-pointer gap-4">
                        <span className="label-text">Light</span>
                        <input type="radio" name="theme-radios" className="radio theme-controller" data-testid="theme-change" checked={isLight} onChange={() => setToLightMode()}/>
                    </label>
                </div>
                    
                <div className="form-control">
                    <label className="setting-item label label cursor-pointer gap-4">
                        <span className="label-text">Dark (default)</span>
                        <input type="radio" name="theme-radios" className="radio theme-controller" checked={isDark} onChange={() => setToDarkMode()}/>
                    </label>
                </div>
    
                <p className="setting-header">Colour-blind Themes</p>
    
                <div className="form-control">
                    <label className="setting-item label label cursor-pointer gap-4">
                        <span className="label-text">Tol</span>
                        <input type="radio" name="theme-radios" className="radio theme-controller" checked={isTol} onChange={() => setToTolMode()}/>
                    </label>
                </div>
    
                <div className="form-control">
                    <label className="setting-item label label cursor-pointer gap-4">
                        <span className="label-text">Wong</span>
                        <input type="radio" name="theme-radios" className="radio theme-controller" checked={isWong} onChange={() => setToWongMode()}/>
                    </label>
                </div>
            </div>
        );
    }
};

export default ThemeSettings;