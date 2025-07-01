import React from "react";

import Invites from "../components/teammembers/Invites";

import projectImage from "../assets/projects.jpg";

const InvitesPage = () => {

    /* This page contains the project invitations the user has received */

    return (
        <div
            className="hero h-screen w-screen"
            style={{
                backgroundImage: `url(${projectImage})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>

            <Invites />
      </div>
    );
};

export default InvitesPage;