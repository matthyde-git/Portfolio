import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import validator from "validator";

import UpdateTaskForm from "./UpdateTaskForm";

const ProjectTask = ({ task, reset }) => {

    const UPDATE_STATUS_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_TASK_STATUS_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_TASK_STATUS_URL;

    const DELETE_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_DELETE_TASK_URL
            : import.meta.env.VITE_PRODUCTION_DELETE_TASK_URL;

    const ASSIGNMENT_URL = 
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_TASK_ASSIGNMENT_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_TASK_ASSIGNMENT_URL;

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const [showUserForm, setShowUserForm] = useState(false);
    const [status, setStatus] = useState(task[3]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [assignee, setAssignee] = useState(task[4]);

    const deadlineWithinNextWeek = () => {
    /* Validator package used to confirm that the deadline is within the next week */
    
        var weekBeforeDeadline = new Date(task[5]);
        weekBeforeDeadline.setDate(weekBeforeDeadline.getDate() - 7)
        
        if (validator.isAfter(new Date().toString(), weekBeforeDeadline.toString()))
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    
    const overDeadline = () => {
    /* Validator package used to confirm that the deadline has passed */

        var deadline = new Date(task[5]);

        if (validator.isAfter(new Date().toString(), deadline.toString()))
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    const { team } = useSelector((store) => store.team);

    const handleClick = () => {
        setShowUserForm(true)
    }

    const handleSubmit = () => {

        // creates an axios post request to update the status of a task and notifies the team

        const newStatus = document.getElementById("status").value;

        const data = {
            taskid: task[0],
            newStatus: newStatus
        }

        axios
            .post(UPDATE_STATUS_URL, data)
            .then((response) => {
                setStatus(newStatus);
                setShowUserForm(false);
                reset();
                toast.success("Status updated successfully");
            })
            .catch((error) => {
                return toast.error(error.message);
            })
        
        for (var i = 0; i < team.length; i++)
        {
            if (user.name !== team[i].email)
            {
                var notifData = {
                    name: team[i].email,
                    message: `${user.name} has updated task: ${task[1]} to ${newStatus} in project: ${sessionStorage.getItem("project-title")}`,
                    date: new Date()
                }

                axios
                .post(NOTIF_URL, notifData)
                .then((response) => {
                    // console.log("Status updated successfully");
                })
                .catch((error) => {
                    // console.log(error.message);
                })
            }
        }
    }

    const handleDelete = () => {

        // creates an axios delete request to delete a task

        const id = {
            taskid: task[0]
        }

        axios
            .delete(DELETE_URL, {data: id})
            .then((response) => {
                toast.success("Task deleted successfully");
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to delete task");
            })
    }

    const joinTask = () => {

        // creates an axios post request to assign the task to the user

        setAssignee(user.name);

        const data = {
            taskid: task[0],
            newAssignee: user.name
        }

        axios
            .post(ASSIGNMENT_URL, data)
            .then((response) => {
                toast.success("Joined task successfully");
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to join task")
            })
    }

    const leaveTask = () => {

        // creates an axios post request to unassign the task to the user

        setAssignee("Unassigned");

        const data = {
            taskid: task[0],
            newAssignee: "Unassigned"
        }

        axios
            .post(ASSIGNMENT_URL, data)
            .then((response) => {
                toast.success("Left task successfully");
                reset();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to join task")
            })
    }

    const { user } = useAuth0();
    const teamleader = sessionStorage.getItem("teamleader")

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else
    {
        if (user.name === teamleader)
        // renders if the user is the team leader, provides methods for updating, deleting, joining and leaving tasks
            {
                return (
                    <>
                        <div 
                            className="card bg-primary text-primary-content w-80 hover:cursor-pointer kanban-card"
                            onClick={() => document.getElementById(task[0] + "modal").showModal()}
                        >
                            <div className="card-body items-center text-center">
                                <h2 className="card-title" data-testid={task[0] + "task-title"}>{task[1]}</h2>
                            </div>
                        </div>
            
                        <dialog id={task[0] + "modal"} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button 
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    >
                                        ✕
                                    </button>
                                </form>
            
                                {
                                    showUserForm ? (
                                        <>
                                            <UpdateTaskForm task={task} refresh={reset}/>
                                            <button className="btn btn-error task-cancel-btn" onClick={() => setShowUserForm(false)}>Cancel</button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            {
                                                showDeleteConfirmation ? (
                                                    <>
                                                        <h2>Are you sure you want to delete this task? This cannot be undone.</h2>
                                                        <button className="btn btn-error delete-modal-btn" onClick={() => setShowDeleteConfirmation(false)}>No</button>
                                                        <form className=" delete-modal-btn" method="dialog">
                                                            <button 
                                                                className="btn btn-success delete-modal-btn"
                                                                data-testid={task[0] + "confirm-delete-task"}
                                                                onClick={handleDelete}>Yes</button>
                                                        </form>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="font-bold text-lg">{task[1]}</h3>
                                                        <p className="py-4">Description : {task[2]}</p>
                                                        <p className="py-4">Status : {status}</p>
                                                        <p className="py-4" data-testid={task[0] + "assigned-to"}>Assigned To : {assignee}</p> 

                                                        {
                                                            overDeadline() ? (
                                                                <p className="py-4 text-error">
                                                                    Deadline : {new Date(task[5]).toLocaleString()}  
                                                                </p>
                                                                        
                                                            ) : (
                                                                <>
                                                                    {
                                                                        deadlineWithinNextWeek() ? (
                                                                            <p className="py-4 text-warning">
                                                                                Deadline : {new Date(task[5]).toLocaleString()}                     
                                                                            </p>
                                                                        ) : (
                                                                            <p className="py-4">
                                                                                Deadline : {new Date(task[5]).toLocaleString()}
                                                                            </p>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                                
                                {
                                    showUserForm ? (
                                        <></>
                                    ) : (
                                        <>
                                            {
                                                showDeleteConfirmation ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        {
                                                            assignee === "Unassigned" ? (
                                                                <>
                                                                    <button className="btn btn-primary task-modal-btn" onClick={joinTask} data-testid={task[0] + "task-assignment-btn"}>Join Task</button>
                                                                    <button className="btn btn-warning task-modal-btn" onClick={handleClick} data-testid={task[0] + "update-task-btn"}>Update</button>
                                                                    <button className="btn btn-error task-modal-btn" onClick={() => setShowDeleteConfirmation(true)} data-testid={task[0] + "delete-task-btn"}>Delete</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        assignee === user.name ? (
                                                                            <>
                                                                                <button className="btn btn-secondary task-modal-btn" onClick={leaveTask}  data-testid={task[0] + "task-assignment-btn"}>Leave Task</button>
                                                                                <button className="btn btn-warning task-modal-btn" onClick={handleClick} data-testid={task[0] + "update-task-btn"}>Update</button>
                                                                                <button className="btn btn-error task-modal-btn" onClick={() => setShowDeleteConfirmation(true)} data-testid={task[0] + "delete-task-btn"}>Delete</button>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <button className="btn btn-warning task-modal-btn" onClick={handleClick} data-testid={task[0] + "update-task-btn"}>Update</button>
                                                                                <button className="btn btn-error task-modal-btn" onClick={() => setShowDeleteConfirmation(true)} data-testid={task[0] + "delete-task-btn"}>Delete</button>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }

                            </div>
                        </dialog>
                    </>
                );
            }
            else if (user.name === task[4])
            // renders if the user is assigned to the task, provides methods for leaving and updating the task status
            {
                return (
                    <>
                        <div 
                            className="card bg-primary text-primary-content w-80 hover:cursor-pointer kanban-card"
                            onClick={() => document.getElementById(task[0] + "modal").showModal()}
                        >
                            <div className="card-body items-center text-center">
                                <h2 className="card-title" data-testid={task[0] + "task-title"}>{task[1]}</h2>
                            </div>
                        </div>
                
                        <dialog id={task[0] + "modal"} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button 
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    >
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg">{task[1]}</h3>
                                <p className="py-4">Description : {task[2]}</p>
                
                                {
                                    showUserForm ? (
                                        <>
                                            <p className="status">Status: </p>
                                            <select 
                                                className="status input select select-warning"
                                                data-testid={task[0] + "update-status-selection"}
                                                id="status" 
                                                name="status" 
                                                required={true} 
                                                defaultValue={status}
                                            >
                                                <option value={"To Do"}>To Do</option>
                                                <option value={"Doing"}>Doing</option>
                                                <option value={"Done"}>Done</option>
                                            </select>
                                        </>
                                            
                                    ) : (
                                        <p className="py-4" data-testid={task[0] + "updated-status"}>Status : {status}</p>
                                    )
                                }
                
                                <p className="py-4" data-testid={task[0] + "assigned-to"}>Assigned To : {assignee}</p>
                                
                                {
                                    overDeadline() ? (
                                        <p className="py-4 text-error">
                                            Deadline : {new Date(task[5]).toLocaleString()}  
                                        </p>
                                                                        
                                    ) : (
                                        <>
                                            {
                                                deadlineWithinNextWeek() ? (
                                                    <p className="py-4 text-warning">
                                                        Deadline : {new Date(task[5]).toLocaleString()}
                                                    </p>
                                                ) : (
                                                    <p className="py-4">
                                                        Deadline : {new Date(task[5]).toLocaleString()}
                                                    </p>
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    showUserForm ? (
                                        <>
                                            <button className="btn btn-error cancel-update-status-btn" onClick={() => setShowUserForm(false)}>Cancel</button>
                                            <button className="btn btn-success confirm-update-status-btn" data-testid={task[0] + "confirm-status-btn"} onClick={handleSubmit}>Confirm</button>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                user.name === assignee ? (
                                                    <>
                                                        <button className="btn btn-warning modal-btns" data-testid={task[0] + "update-status-btn"} onClick={handleClick}>Update Task</button>
                                                        <button className="btn btn-error modal-btns" onClick={leaveTask} data-testid={task[0] + "task-assignment-btn"}>Leave Task</button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={joinTask} data-testid={task[0] + "task-assignment-btn"}>Join Task</button>
                                                )
                                            }
                                            
                                        </>
                                    )
                                }
                            </div>
                        </dialog>
                    </>
                );
            }
            else 
            {
            // renders if the user is neither the team leader nor the user assigned to the task, only allows them to view the task
                return (
                    <>
                        <div 
                            className="card bg-primary text-primary-content w-80 hover:cursor-pointer kanban-card"
                            onClick={() => document.getElementById(task[0] + "modal").showModal()}
                        >
                            <div className="card-body items-center text-center">
                                <h2 className="card-title" data-testid={task[0] + "task-title"}>{task[1]}</h2>
                            </div>
                        </div>
            
                        <dialog id={task[0] + "modal"} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button 
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    >
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg">{task[1]}</h3>
                                <p className="py-4">Description : {task[2]}</p>
                                <p className="py-4">Status : {status}</p>
                                <p className="py-4" data-testid={task[0] + "assigned-to"}>Assigned To : {assignee}</p>
                                
                                {
                                    overDeadline() ? (
                                        <p className="py-4 text-error">
                                            Deadline : {new Date(task[5]).toLocaleString()}  
                                        </p>
                                                                        
                                    ) : (
                                        <>
                                            {
                                                deadlineWithinNextWeek() ? (
                                                    <p className="py-4 text-warning">
                                                        Deadline : {new Date(task[5]).toLocaleString()}
                                                    </p>
                                                ) : (
                                                    <p className="py-4">
                                                        Deadline : {new Date(task[5]).toLocaleString()}
                                                    </p>
                                                )
                                            }
                                        </>
                                    )
                                }

                                {
                                    assignee === "Unassigned" ? (
                                        <>
                                            <button className="btn btn-primary task-modal-btn" onClick={joinTask} data-testid={task[0] + "task-assignment-btn"}>Join Task</button>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                assignee === user.name ? (
                                                    <>
                                                        <button className="btn btn-warning modal-btns" onClick={handleClick}>Update Task</button>
                                                        <button className="btn btn-error modal-btns" onClick={leaveTask} data-testid={task[0] + "task-assignment-btn"}>Leave Task</button>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                                
                            </div>
                        </dialog>
                    </>
                );
            }
    }  
};

export default ProjectTask;