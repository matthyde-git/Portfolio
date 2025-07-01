import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const CreateTaskForm = ({ refresh }) => {

    // form for the team leader to create tasks

    const { team } = useSelector((store) => store.team);

    const CREATE_TASK_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_ADD_TASK_URL
        : import.meta.env.VITE_PRODUCTION_ADD_TASK_URL;

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const { user } = useAuth0();

    const resetForm = () => {
        var form = document.getElementById("task-form");
        form.reset();
    };
    
    const validateDeadline = (date) => {
    // validator package used to make sure the task deadline is not in the past
    
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

        // creates an axios post request to create a new project task and notify the team

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);
        
        if (validateDeadline(entries.deadline))
        {
                axios
                    .post(CREATE_TASK_URL, entries)
                    .then((response) => {
                        toast.success("Task created successfully");
                        refresh();
                        resetForm();
                    })
                    .catch((error) => {
                        // console.log(error);
                        return toast.error(error.message);
                    });

                for (let i = 0; i < team.length; i++)
                {
                    if (team[i].email !== sessionStorage.getItem("username"))
                    {
                        if (team[i].acceptedinvite === true)
                        {
                            // sends the users that have accepted invites to the project a notification
                    
                            const data = {
                                name: team[i].email,
                                message: `There are new tasks in project: ${sessionStorage.getItem("project-title")}`,
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
        else
        {
            return toast.error("Deadline cannot be in the past");
        }
    }

    if (user !== undefined) 
    {
        return (
            <div>
                <form id="task-form" onSubmit={handleSubmit}>
            
                    <label className="form-header" htmlFor="title">Title:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="create-task-title"
                        type="text" 
                        id="title" 
                        name="title"
                        required={true} 
                        placeholder="Task title"
                    >
                    </input>
            
                    <label className="form-header" htmlFor="description">Description:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-success"
                        data-testid="create-task-description"
                        id="description" 
                        name="description"
                        required={true} 
                        rows={8}
                        cols={64}
                        placeholder="Describe the task"
                    >
                    </textarea>
            
                    <label className="form-header" htmlFor="deadline">Deadline: </label>
                    <input
                        className="form-section input input-bordered input-success w-full"
                        data-testid="create-task-deadline"
                        type="datetime-local" 
                        id="deadline" 
                        name="deadline"
                        required={true}  
                    >
                    </input>

                    <label className="form-header" htmlFor="projectid" hidden>ProjectId:</label> <br></br>
                    <input 
                        type="number"
                        id="projectid" 
                        name="projectid" 
                        required={true} 
                        value={sessionStorage.getItem("projectid")} 
                        readOnly={true} 
                        hidden>
                    </input>
            
                    <button className="update-form-btn btn btn-success" type="submit" data-testid="add-task-btn">Create</button>
            
                </form>
            </div>
        );
    }
}

export default CreateTaskForm;