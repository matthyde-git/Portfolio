import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import RecentProjectTasks from "../tasks/RecentProjectTasks";
import TeamMembers from "../teammembers/TeamMembers";
import UpdateProjectForm from "../projects/UpdateProjectForm";
import TopRisks from "../risks/TopRisks";
import RecentProjectMessages from "../messages/RecentProjectMessages";

import { fetchProjectTasks } from "../../features/tasks/taskSlice.js";

const DELETE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_DELETE_PROJECT_URL
        : import.meta.env.VITE_PRODUCTION_DELETE_PROJECT_URL;

const LEAVE_URL = 
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_REMOVE_MEMBER_URL
        : import.meta.env.VITE_PRODUCTION_REMOVE_MEMBER_URL;

const NOTIF_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
        : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

const DetailedProject = ( { detailedProject, reset }) => {

    /* Contains all of the key information for a single project, including team info, risks, tasks, messages and files */

    const deadlineWithinNextWeek = () => {
    /* Validator package used to confirm that the deadline is within the next week */
    
        var weekBeforeDeadline = new Date(detailedProject[5]);
        weekBeforeDeadline.setDate(weekBeforeDeadline.getDate() - 7)
        
        return (validator.isAfter(new Date().toString(), weekBeforeDeadline.toString()))
    }
    
    const overDeadline = () => {
    /* Validator package used to confirm that the deadline has passed */

        var deadline = new Date(detailedProject[5])
        
        return (validator.isAfter(new Date().toString(), deadline.toString()))
    }

    const navigate = useNavigate();

    const navigateToProjects = () => {
        navigate("/projects");
    };
          
    const navigateToProjectTasks = () => {
        navigate("/project/tasks");
    };

    const navigateToProjectFiles = () => {
        navigate("/project/files");
    };

    const navigateToProjectRisks = () => {
        navigate("/project/risks");
    };

    const navigateToProjectMessages = () => {
        navigate("/project/messages");
    };

    const { team } = useSelector((store) => store.team);

    const { projectTasks, isLoading } = useSelector((store) => store.tasks);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchProjectTasks());
    }, []);
    
    const numberOfTasksDone = () => {
    // function that returns the number of tasks completed and the total number of project tasks

        let total = 0;
        let numDone = 0;

        for (let i = 0; i < projectTasks.length; i++)
        {
            total++;

            if (projectTasks[i].status === "Done")
            {
                numDone++;
            }
        }

        return([numDone, total]);
    }

    const percentageComplete = (numDone, total) => {
    // function that returns the percentage of tasks completed

        return ((numDone / total) * 100);
    }

    sessionStorage.setItem("project-title", detailedProject[1]);
    sessionStorage.setItem("teamleader", detailedProject[2]);

    const { user } = useAuth0();

    const deleteProject = () => {

        /* Creates an axios delete request to delete a project */

        const id = {
            projectid: detailedProject[0]
        }

        axios
            .delete(DELETE_URL, {data: id})
            .then((response) => {
                // console.log("Project deleted successfully");
                navigate("/projects");
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to delete project");
            })
    }

    const leaveProject = () => {

        /* Creates an axios delete request to remove a user from the project team */

        const reqData = {
            projectid: detailedProject[0],
            email: user.name
        }

        axios
            .delete(LEAVE_URL, {data: reqData})
            .then((response) => {
                // console.log("Left project successfully");
                navigateToProjects();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to leave project");
            })

        for (let i = 0; i < team.length; i++)
        {
            if (team[i].email !== sessionStorage.getItem("username"))
            {
                if (team[i].acceptedinvite === true)
                {
                    // sends the users that have accepted invites to the project a notification
            
                    const data = {
                        name: team[i].email,
                        message: `${sessionStorage.getItem("username")} has left project: ${sessionStorage.getItem("project-title")}`,
                        date: new Date()
                    } 
                
                    axios
                        .post(NOTIF_URL, data)
                        .then((response) => {
                            // console.log("Notif sent successfully");
                        })
                        .catch((error) => {
                            // console.log(error);
                        });
                }
            }
        }
    }
        
    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else if (user.name === detailedProject[2])
    {
    // renders if the user is the projects team leader, provides methods for updating/deleting projects and inviting/removing team members
        return (
            <div className="detailed-prj" data-testid="detailed-prj">    
                <div 
                    id="project-info" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                    >
                    
                    <p className="text-primary project-text">Title</p>
                    <p className="project-text">{detailedProject[1]}</p>
    
                    <p className="text-primary project-text">Description</p>
                    <p className="project-text prg-desc overflow-y-auto">{detailedProject[3]}</p>
    
                    <p className="text-primary project-text">Deadline</p>

                    {
                        overDeadline() ? (
                            <p className="project-text text-error" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    
                        ) : (
                            <>
                                {
                                    deadlineWithinNextWeek() ? (
                                        <p className="project-text text-warning" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    ) : (
                                        <p className="project-text" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    )
                                }
                            </>
                        )
                    }

                    <p className="text-primary project-text">Status</p>

                    <p className="project-text">{detailedProject[4]}</p>
                    <p className="project-text">Tasks Completed: {numberOfTasksDone()[0]}/{numberOfTasksDone()[1]}</p>

                    <progress 
                        className="progress progress-primary w-60 prj-progress" 
                        value={percentageComplete(numberOfTasksDone()[0], numberOfTasksDone()[1])} 
                        max="100">
                    </progress>

                    <div className="project-info-btns">
                        <button 
                            // id="file-btn" 
                            // className="btn btn-primary project-btn"
                            className="btn btn-primary info-card-btn"
                            data-testid="to-prj-files"
                            onClick={navigateToProjectFiles}
                        >
                            Files
                        </button>
                    
                        <button 
                            // className="btn btn-warning prg-update-btn"
                            className="btn btn-warning info-card-btn"
                            onClick={() => document.getElementById("info-modal").showModal()}
                        >
                            Update
                        </button>
        
                        <button 
                            // className="btn btn-error prg-delete-btn"
                            className="btn btn-error info-card-btn"
                            data-testid="project-delete-btn"
                            onClick={() => document.getElementById("delete-modal").showModal()}
                            >Delete
                        </button>
                    </div>
                    
                </div>
    
                <dialog id="info-modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button 
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={reset}
                                >
                                    ✕
                                </button>
                        </form>
                        
                        <UpdateProjectForm project={detailedProject} />
    
                    </div>
                </dialog>

                <dialog id="delete-modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                        </form>
                        
                        <h2>Are you sure you want to delete this project? This cannot be undone.</h2>

                        <form className="delete-btn" method="dialog">
                            <button className="btn btn-error delete-btn">No</button>
                        </form>

                        <button 
                            className="btn btn-success delete-btn"
                            data-testid={"confirm-delete-project"}
                            onClick={deleteProject}>
                                Yes
                        </button>
    
                    </div>
                </dialog>
    
                <div 
                    id="project-team" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                >
    
                    <p className="text-primary project-text">Team Members</p>
                    
                    <div className="list overflow-auto">
                        <TeamMembers teamLeader={detailedProject[2]} projectid={detailedProject[0]}/>
                    </div>
                </div>

                <div 
                    id="project-risks" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                >
    
                    <p className="text-primary project-text">Top Risks</p>
                    
                    <div className="list overflow-y-auto">
                        <TopRisks />
                    </div>

                    <button 
                        id="task-btn"
                        data-testid="to-prj-risks"
                        className="btn btn-primary project-btn btn-center"
                        onClick={navigateToProjectRisks}
                    >
                        Go To Risks
                    </button>
                </div>
    
                <div id="project-tasks" className="card-bordered border-primary overflow-y-auto bg-base-300">
    
                    <p className="text-primary project-text">Upcoming Tasks</p>
    
                    <div className="list overflow-y-auto">
                        <RecentProjectTasks />
                    </div>
                    
                    <button 
                        id="task-btn" 
                        className="btn btn-primary project-btn btn-center"
                        data-testid="to-prj-tasks"
                        onClick={navigateToProjectTasks}
                    >
                        Go To Tasks
                    </button>
    
                </div>
    
                <div id="project-messages" className="card-bordered border-primary overflow-y-auto bg-base-300">
    
                    <p className="text-primary project-text">Recent Messages</p>
    
                    <div className="list overflow-y-auto">
                        <RecentProjectMessages />
                    </div>
    
                    <button 
                        id="message-btn" 
                        data-testid="to-prj-msgs"
                        className="btn btn-primary project-btn"
                        onClick={navigateToProjectMessages}
                    >
                        Go To Messages
                    </button>
                </div>
            </div>
        );
    }
    else
    {
    /* Renders if the user is not the team leader, provide a method for leaving the project */
        return (
            <div className="detailed-prj"  data-testid="detailed-prj">    
                <div 
                    id="project-info" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                    >
                    
                    <p className="text-primary project-text">Title</p>
                    <p className="project-text">{detailedProject[1]}</p>

                    <p className="text-primary project-text">Description</p>
                    <p className="project-text prg-desc overflow-y-auto">{detailedProject[3]}</p>

                    <p className="text-primary project-text">Deadline</p>

                    {
                        overDeadline() ? (
                            <p className="project-text text-error" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    
                        ) : (
                            <>
                                {
                                    deadlineWithinNextWeek() ? (
                                        <p className="project-text text-warning" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    ) : (
                                        <p className="project-text" data-testid="prj-deadline">{new Date(detailedProject[5]).toLocaleString()}</p>
                                    )
                                }
                            </>
                        )
                    }

                    <p className="text-primary project-text">Status</p>
                    <p className="project-text">{detailedProject[4]}</p>
                    <p className="project-text">Tasks Completed: {numberOfTasksDone()[0]}/{numberOfTasksDone()[1]}</p>

                    <progress 
                        className="progress progress-primary w-60 prj-progress" 
                        value={percentageComplete(numberOfTasksDone()[0], numberOfTasksDone()[1])} 
                        max="100">
                    </progress>

                    <div className="project-info-btns">
                        <button 
                            // id="file-btn" 
                            // className="btn btn-primary project-btn"
                            className="btn btn-primary info-card-btn-file"
                            onClick={navigateToProjectFiles}
                        >
                            Files
                        </button>

                        <button 
                            className="btn btn-error info-card-btn-leave"
                            data-testid="leave-btn"
                            onClick={() => document.getElementById("leave-modal").showModal()}
                        >
                            Leave Project
                        </button>

                        <dialog id="leave-modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                                </form>
                                
                                <h2>Are you sure you want to leave the project? This cannot be undone.</h2>

                                <form className="delete-btn" method="dialog">
                                    <button className="btn btn-error delete-btn">No</button>
                                </form>

                                <button 
                                    className="btn btn-success delete-btn"
                                    data-testid="confirm-leave-prj-btn"
                                    onClick={leaveProject}>
                                        Yes
                                </button>
            
                            </div>
                        </dialog>
                    </div>
                    
                </div>

                <div 
                    id="project-team" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                >

                    <p className="text-primary project-text">Team Members</p>
                    
                    <div className="list overflow-auto">
                        <TeamMembers teamLeader={detailedProject[2]} projectid={detailedProject[0]}/>
                    </div>
                </div>

                <div 
                    id="project-risks" 
                    className="card-bordered border-primary overflow-y-auto bg-base-300"
                >

                    <p className="text-primary project-text">Top Risks</p>
                    
                    <div className="list overflow-y-auto">
                        <TopRisks />
                    </div>

                    <button 
                        id="task-btn" 
                        className="btn btn-primary project-btn btn-center"
                        onClick={navigateToProjectRisks}
                    >
                        Go To Risks
                    </button>
                </div>

                <div id="project-tasks" className="card-bordered border-primary overflow-y-auto bg-base-300">

                    <p className="text-primary project-text">Upcoming Tasks</p>

                    <div className="list overflow-y-auto">
                        <RecentProjectTasks />
                    </div>
                    
                    <button 
                        id="task-btn" 
                        className="btn btn-primary project-btn btn-center"
                        data-testid="to-prj-tasks"
                        onClick={navigateToProjectTasks}
                    >
                        Go To Tasks
                    </button>

                </div>

                <div id="project-messages" className="card-bordered border-primary overflow-y-auto bg-base-300">

                    <p className="text-primary project-text">Recent Messages</p>

                    <div className="list overflow-y-auto">
                        <RecentProjectMessages />
                    </div>

                    <button 
                        id="message-btn" 
                        className="btn btn-primary project-btn"
                        onClick={navigateToProjectMessages}
                    >
                        Go To Messages
                    </button>
                </div>
            </div>
        );
    }
};

export default DetailedProject;