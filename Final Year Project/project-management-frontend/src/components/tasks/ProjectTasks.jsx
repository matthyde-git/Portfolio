import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import ProjectTask from "./ProjectTask";
import CreateTaskForm from "./CreateTaskForm.jsx";

import { fetchProjectTasks } from "../../features/tasks/taskSlice.js";

const ProjectTasks = () => {

    // displays all of the project tasks in a kanban board style

    const navigate = useNavigate();
                    
    const navigateToHome = () => {
        navigate("/");
    };
                  
    const navigateToProjects = () => {
        navigate("/projects");
    };
        
    const navigateToDetailedProject = () => {
        navigate("/project/overview");
    };

    const { projectTasks, isLoading } = useSelector((store) => store.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjectTasks());
    }, []);

    const resetBoard = () => {
        dispatch(fetchProjectTasks());
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const { user } = useAuth0();
    
    if (user === undefined)
    {
        return <h1>Loading...</h1>
    }
    else
    {
        return (
            <>
                <div id="breadcrumbs" className="breadcrumbs text-sm" data-testid="prj-tasks-breadcrumbs">
                    <ul>
                        <li>
                            <a onClick={navigateToHome}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <a onClick={navigateToProjects}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                Projects
                            </a>
                        </li>
                        <li>
                            <a onClick={navigateToDetailedProject}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                Overview
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                Tasks
                            </a>
                        </li>
                    </ul>
                </div>

                <span className="badge badge badge-warning indicator-item back-btn hover:cursor-pointer" onClick={navigateToDetailedProject}>

                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="h-5 w-5">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>

                    Back to overview

                </span>  

                {
                    projectTasks.length > 0 ? (
                        <div className="kanban-board">
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center to-do-leader overflow-y-auto">
                                    <h2 className="card-title text-primary to-do">To Do</h2>
                                    {projectTasks.map((task) => {
                                        if (task.status === "To Do")
                                        {
                                            return <ProjectTask task={Object.values(task)} reset={resetBoard}/>;
                                        }
                                    })}

                                    {
                                        user.name === sessionStorage.getItem("teamleader") ? (
                                            <button 
                                                className="btn btn-success add-task-btn"
                                                onClick={() => document.getElementById("task-modal").showModal()}>
                                                    Add Task
                                            </button>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-primary">Doing</h2>
                                    {projectTasks.map((task) => {
                                        if (task.status === "Doing")
                                        {
                                            return <ProjectTask task={Object.values(task)} reset={resetBoard}/>;
                                        }
                                    })}
                                </div>
                            </div>
                
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-primary">Done</h2>
                                    {projectTasks.map((task) => {
                                        if (task.status === "Done")
                                        {
                                            return <ProjectTask task={Object.values(task)} reset={resetBoard}/>;
                                        }
                                    })}
                                </div>
                            </div>
                            <dialog id="task-modal" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button 
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
                                        >
                                            ✕
                                        </button>
                                    </form>

                                    <CreateTaskForm refresh={resetBoard}/>
                
                                </div>
                            </dialog>
                        </div>
                    ) : (
                        <div className="kanban-board">
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center to-do-leader overflow-y-auto">
                                    <h2 className="card-title text-primary to-do">To Do</h2>

                                    {
                                        user.name === sessionStorage.getItem("teamleader") ? (
                                            <>
                                                <p className="project-text">There are no tasks yet, add a task below</p>
                                                <button 
                                                    className="btn btn-success add-task-btn"
                                                    onClick={() => document.getElementById("task-modal").showModal()}>
                                                        Add Task
                                                </button>
                                                <dialog id="task-modal" className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            <button 
                                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
                                                            >
                                                                ✕
                                                            </button>
                                                        </form>

                                                        <CreateTaskForm refresh={resetBoard}/>
                                    
                                                    </div>
                                                </dialog>
                                            </>
                                            
                                        ) : (
                                            <p className="project-text">There are no tasks yet, wait for the team leader to add a task</p>
                                        )
                                    }                         

                                </div>
                            </div>
                
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-primary">Doing</h2>
                                </div>
                            </div>
                
                            <div className="card kanban-col bg-base-100 card-bordered border-primary w-96 shadow-xl overflow-y-auto">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-primary">Done</h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        );
    }
};

export default ProjectTasks;