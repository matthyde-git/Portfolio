import React from "react";

import Notifications from "../components/notifications/Notifications";

import projectImage from "../assets/projects.jpg"

const NotificationsPage = () => {

    /* Contains all of the user's notifications */

    return (
        <div
            className="hero h-screen w-screen"
            style={{
                backgroundImage: `url(${projectImage})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>

            <Notifications />
      </div>
    );
};

export default NotificationsPage;