import React from "react";

import ProjectFiles from "../components/files/ProjectFiles";

import projectImage from "../assets/projects.jpg";

const ProjectFilesPage = () => {

    /* Contains all of the files for a project */

    return (
        <div
          className="hero h-screen w-screen"
          style={{
              backgroundImage: `url(${projectImage})`,
          }}>
          <div className="hero-overlay bg-opacity-60"></div>
  
            <ProjectFiles />
        </div>
    );
};

export default ProjectFilesPage;