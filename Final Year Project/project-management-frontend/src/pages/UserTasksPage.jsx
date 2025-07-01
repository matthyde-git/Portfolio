import React from "react";

import UserTasks from "../components/tasks/UserTasks";

import projectImage from "../assets/projects.jpg"

const UserTasksPage = () => {

    /* Contains all of the tasks the user is assigned to */

    return (
        <div
          className="hero h-screen w-screen"
          style={{
              backgroundImage: `url(${projectImage})`,
          }}>
          <div className="hero-overlay bg-opacity-60"></div>
  
            <UserTasks />
        </div>
      );
};

export default UserTasksPage;