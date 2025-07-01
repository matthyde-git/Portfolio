import React from "react";

import Projects from "../components/projects/Projects";

import projectImage from "../assets/projects.jpg"

const ProjectsPage = () => {

    /* Contains all of the projects a user is a member of */

    return (
      <div
        className="hero h-screen w-screen"
        style={{
            backgroundImage: `url(${projectImage})`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>

          <Projects />
      </div>
    );
};

export default ProjectsPage;