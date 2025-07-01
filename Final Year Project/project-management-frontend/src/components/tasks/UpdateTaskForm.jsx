import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useSelector } from "react-redux";

const UpdateTaskForm = ({ task, refresh }) => {

    // component for the team leader to update project tasks

    const UPDATE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_TASK_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_TASK_URL;

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const { team } = useSelector((store) => store.team);

    const validateDeadline = (date) => {
    // validator package used to make sure the deadline is not in the past

        if (validator.isAfter(date, new Date().toString()))
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    const handleSubmit = (e) => {

        // sends and axios post request to update the task information and notifies the team

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        if (validateDeadline(entries.deadline))
        {
            axios
                .post(UPDATE_URL, entries)
                .then((response) => {
                    toast.success("Task updated successfully");
                    refresh();
                })
                .catch((error) => {
                    // console.log(error);
                    return toast.error(error.message);
                });
        }
        else
        {
            return toast.error("Deadline cannot be in the past")
        }

        for (var i = 0; i < team.length; i++)
        {
            if (sessionStorage.getItem("username") !== team[i].email)
            {
                var notifData = {
                    name: team[i].email,
                    message: `${sessionStorage.getItem("username")} has updated task: ${task[1]} in project: ${sessionStorage.getItem("project-title")}`,
                    date: new Date()
                }
    
                axios
                    .post(NOTIF_URL, notifData)
                    .then((response) => {
                        // console.log("Updated successfully");
                    })
                    .catch((error) => {
                        // console.log(error.message);
                    })
            }
        }
    }

    const formatDate = () => {
    // converts the deadline datetime value into a readable format

        const date = task[5].slice(0, 19);
        
        return date;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="taskid" hidden>TaskID:</label>
                <input 
                    type="number" 
                    id="taskid" 
                    name="taskid" 
                    required={true} 
                    value={task[0]} 
                    readOnly={true} 
                    hidden>
                </input>

                <label className="form-header" htmlFor="title">Title:</label><br></br>
                <input 
                    className="form-section input input-bordered input-warning w-full"
                    data-testid={task[0] + "update-task-title"}
                    type="text" 
                    id="title" 
                    name="title" 
                    defaultValue={task[1]}
                >
                </input>

                <br></br>

                <label className="form-header" htmlFor="description">Description:</label><br></br>
                <textarea 
                    className="form-section textarea textarea-warning" 
                    data-testid={task[0] + "update-task-description"}
                    id="description" 
                    name="description"
                    rows={8}
                    cols={64}
                    defaultValue={task[2]}
                >
                </textarea>

                <br></br>

                <label className="form-header" htmlFor="status">Status:</label> <br></br>
                <select 
                    className="form-section input input-bordered input-warning w-full"
                    data-testid={task[0] + "update-task-status"}
                    id="status" 
                    name="status" 
                    required={true} 
                    defaultValue={task[3]}
                >
                    <option value={"To Do"}>To Do</option>
                    <option value={"Doing"}>Doing</option>
                    <option value={"Done"}>Done</option>
                </select>

                <br></br>

                <label className="form-header" htmlFor="assignedto">Assigned To:</label><br></br>
                <select 
                    className="form-section input input-bordered input-warning w-full"
                    data-testid={task[0] + "update-task-assignment"}
                    type="text" 
                    id="assignedto" 
                    name="assignedto" 
                    defaultValue={task[4]}
                >
                    <option value={"Unassigned"}>Unassigned</option>
                    {
                        team.map((member) => {
                            const email = member.email;

                            return (
                                <option value={email}>{email}</option>
                            )
                        })
                    }
                </select>

                <br></br>

                <label className="form-header" htmlFor="deadline">Deadline: </label>
                <input
                    className="form-section input input-bordered input-warning w-full"
                    data-testid={task[0] + "update-task-deadline"}
                    type="datetime-local" 
                    id="deadline" 
                    name="deadline" 
                    defaultValue={formatDate()}
                >
                </input>

                <button className="update-task-btn btn btn-warning" type="submit" data-testid={task[0] + "update-task-form-btn"}>Update</button>

            </form>
        </div>
    );
};

export default UpdateTaskForm;