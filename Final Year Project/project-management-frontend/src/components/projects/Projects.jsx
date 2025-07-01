import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Project from "./Project.jsx";

import CreateProjectForm from "./CreateProjectForm.jsx";

import { fetchUserProjects } from "../../features/projects/projectSlice.js";
import { fetchInvites } from "../../features/teammembers/teamMemberSlice.js";

const Projects = () => {

    // renders a list of all the projects a user a member of, provides a method to create projects and

    const navigate = useNavigate();
      
    const navigateToHome = () => {
        navigate("/");
    };
    
    const navigateToProjects = () => {
        navigate("/projects");
    };

    const navigateToInvites = () => {
        navigate("/invites");
    };

    const { projects, isLoading } = useSelector((store) => store.projects);
    const { invites } = useSelector((store) => store.team);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProjects());
    }, []);

    useEffect(() => {
        dispatch(fetchInvites());
    }, []);

    const refreshProjects = () => {
        dispatch(fetchUserProjects());
    };

    // if (isLoading) {
    //     return <h1>Loading...</h1>
    // }

    return (
        <>
            <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm " data-testid="prj-breadcrumbs">
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
                </ul>
            </div>

            <span className="badge badge badge-warning indicator-item back-btn hover:cursor-pointer" onClick={navigateToHome}>

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

                Back to home

            </span>             

            <div className="box bg-base-100 card-bordered border-primary overflow-auto" data-testid="projects-list">
                <table className="table tables">
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Team Leader</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>

                    {
                        projects.length > 0 ? (
                            <>
                                {projects.map((project) => {
                                    return (
                                        <>
                                            <Project project={project} key={project.projectid}/>
                                        </>
                                    )
                            })}
                            </>
                        ) : (
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="project-text">You're not in any projects yet, create one or join through an invite below.</p>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                    
                </table>

                <dialog id="project-modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button 
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={refreshProjects}>
                                    ✕
                            </button>
                        </form>
                        
                        <CreateProjectForm />

                    </div>
                </dialog>

                <label htmlFor="project-modal"
                    className="btn btn-primary"
                    id="create-project-btn"
                    data-testid="prj-modal-btn"
                    onClick={() => document.getElementById("project-modal").showModal()}
                    >
                        Create Project
                </label> 
                
                {
                    invites.length > 0 ? (
                        <>
                            <div className="indicator invites-btn">
                            <span className="indicator-item badge badge-primary">{invites.length}</span>
                                <button 
                                    className="btn btn-secondary view-invites-btn"
                                    data-testid="invites-btn"
                                    onClick={navigateToInvites}>
                                        Invites
                                </button>
                            </div>

                        </>
                    ) : (
                        <>
                            <button 
                                className="btn btn-secondary" 
                                id="view-invites-btn"
                                data-testid="invites-btn"
                                onClick={navigateToInvites}>
                                    Invites
                            </button>
                        </>
                    )
                }
            </div>
        </>
        
    );
    
};

export default Projects;