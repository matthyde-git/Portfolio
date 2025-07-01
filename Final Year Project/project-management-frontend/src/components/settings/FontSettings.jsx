import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { fetchUserPreferences } from "../../features/preferences/preferenceSlice.js";

const FontSettings = () => {

    /* Component for the font settings, checks if the user has preferences set and updates them if the click one of the options */

    const { userPreferences } = useSelector((store) => store.preferences);

    const [isSmall, setIsSmall] = useState((userPreferences.length > 0) && (userPreferences[0].fontsize === "small"));
    const [isMedium, setIsMedium] = useState((userPreferences.length > 0) && (userPreferences[0].fontsize === "medium"));
    const [isLarge, setIsLarge] = useState((userPreferences.length > 0) && (userPreferences[0].fontsize === "large"));
    const [isLarger, setIsLarger] = useState((userPreferences.length > 0) && (userPreferences[0].fontsize === "larger"));

    const UPDATE_FONT_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_FONT_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_FONT_URL;

    const ADD_PREFS_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_PREFERENCES_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_PREFERENCES_URL;

    const root = document.getElementsByTagName("html")[0];

    const dispatch = useDispatch();
        
    const refresh = () => {
        dispatch(fetchUserPreferences());
    };

    const handleSmallFont = () => {

        root.style.fontSize = "small";
        
        if (userPreferences.length > 0)
        {
            const data = {
                user: sessionStorage.getItem("username"),
                newFontSize: "small"
            }

            axios
            .post(UPDATE_FONT_URL, data)
            .then((response) => {
                setIsSmall(true);
                setIsMedium(false);
                setIsLarge(false);
                setIsLarger(false);
                refresh();
            })
            .catch((error) => {
                return toast.error("Failed to update font");
            })
        }
        else
        {
            const data = {
                user: sessionStorage.getItem("username"),
                theme: "dark",
                fontsize: "small"
            }

            axios
            .post(ADD_PREFS_URL, data)
            .then((response) => {
                setIsSmall(true);
                setIsMedium(false);
                setIsLarge(false);
                setIsLarger(false);
                refresh();
            })
            .catch((error) => {
                return toast.error("Failed to update font");
            })
        }
    }

    const handleMediumFont = () => {

        root.style.fontSize = "medium";

        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newFontSize: "medium"
                }
    
                axios
                .post(UPDATE_FONT_URL, data)
                .then((response) => {
                    setIsSmall(false);
                    setIsMedium(true);
                    setIsLarge(false);
                    setIsLarger(false);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
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
                    setIsSmall(false);
                    setIsMedium(true);
                    setIsLarge(false);
                    setIsLarger(false);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
                })
            }
    }

    const handleLargeFont = () => {

        root.style.fontSize = "large";

        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newFontSize: "large"
                }
    
                axios
                .post(UPDATE_FONT_URL, data)
                .then((response) => {
                    setIsSmall(false);
                    setIsMedium(false);
                    setIsLarge(true);
                    setIsLarger(false);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "dark",
                    fontsize: "large"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsSmall(false);
                    setIsMedium(false);
                    setIsLarge(true);
                    setIsLarger(false);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
                })
            }
    }

    const handleLargerFont = () => {

        root.style.fontSize = "larger";

        if (userPreferences.length > 0)
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    newFontSize: "larger"
                }
    
                axios
                .post(UPDATE_FONT_URL, data)
                .then((response) => {
                    setIsSmall(false);
                    setIsMedium(false);
                    setIsLarge(false);
                    setIsLarger(true);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
                })
            }
            else
            {
                const data = {
                    user: sessionStorage.getItem("username"),
                    theme: "dark",
                    fontsize: "larger"
                }
    
                axios
                .post(ADD_PREFS_URL, data)
                .then((response) => {
                    setIsSmall(false);
                    setIsMedium(false);
                    setIsLarge(false);
                    setIsLarger(true);
                    refresh();
                })
                .catch((error) => {
                    return toast.error("Failed to update font");
                })
            }
    }

    return (
        <div id="font-settings" className="bg-base-100 card-bordered border-primary" data-testid="font-settings">

            <h1 className="text-center" id="setting-title">Font Settings</h1>

            <p className="setting-header">Font Sizes</p>

            <div className="form-control">
                <label className="setting-item label cursor-pointer gap-4">
                    <span className="label-text">Small</span>
                    <input type="radio" name="font-radios" className="radio theme-controller" checked={isSmall} onChange={() => handleSmallFont()}/>
                </label>
            </div>

            <div className="form-control">
                <label className="setting-item label label cursor-pointer gap-4">
                    <span className="label-text">Medium (default)</span>
                    <input type="radio" name="font-radios" className="radio theme-controller" checked={isMedium} onChange={() => handleMediumFont()}/>
                </label>
            </div>
        
            <div className="form-control">
                <label className="setting-item label label cursor-pointer gap-4">
                    <span className="label-text">Large</span>
                    <input type="radio" name="font-radios" className="radio theme-controller" checked={isLarge} onChange={() => handleLargeFont()}/>
                </label>
            </div>

            <div className="form-control">
                <label className="setting-item label label cursor-pointer gap-4">
                    <span className="label-text">Larger</span>
                    <input type="radio" name="font-radios" className="radio theme-controller" data-testid="font-change" checked={isLarger} onChange={() => handleLargerFont()}/>
                </label>
            </div>
        </div>
    );
};

export default FontSettings;