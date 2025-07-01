import React from "react";

import DetailedProjects from "../components/projects/DetailedProjects";

import projectImage from "../assets/projects.jpg";

const DetailedProjectPage = () => {

      /* This page contains the team info, risks, tasks, messages and files for a single project */
  
      return (
        <div
          className="hero h-screen w-screen"
          style={{
              backgroundImage: `url(${projectImage})`,
          }}>
          <div className="hero-overlay bg-opacity-60"></div>
  
            <DetailedProjects />
        </div>
      );
  };
  
  export default DetailedProjectPage;