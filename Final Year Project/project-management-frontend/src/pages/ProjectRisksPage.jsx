import React from "react";

import Risks from "../components/risks/Risks.jsx";

import projectImage from "../assets/projects.jpg"

const RisksPage = () => {

    return (

      /* Contains all of the risks for a project */

      <div
        className="hero h-screen w-screen"
        style={{
            backgroundImage: `url(${projectImage})`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>

          <Risks />
      </div>
    );
};

export default RisksPage;