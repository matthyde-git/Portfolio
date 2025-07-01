import React from "react";

import ProjectTasks from "../components/tasks/ProjectTasks";

import projectImage from "../assets/projects.jpg"

const ProjectTasksPage = () => {

    /* Contains all of the tasks for a project */

    return (
        <div
        className="hero h-screen w-screen"
        style={{
            backgroundImage: `url(${projectImage})`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>

          <ProjectTasks />
      </div>
    );
};

export default ProjectTasksPage;