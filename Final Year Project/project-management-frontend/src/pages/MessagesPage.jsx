import React from "react";

import Messages from "../components/messages/Messages";

import projectImage from "../assets/projects.jpg";

const MessagesPage = () => {

    /* Contains all the messages in a project */

    return (
        <div
            className="hero h-screen w-screen"
            style={{
                backgroundImage: `url(${projectImage})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>

            <Messages />
      </div>
    );
};

export default MessagesPage;