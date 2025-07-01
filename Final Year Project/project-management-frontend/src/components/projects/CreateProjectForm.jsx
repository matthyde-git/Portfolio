import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useAuth0 } from "@auth0/auth0-react";

const CreateProjectForm = () => {

    const CREATE_PROJECT_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CREATE_PROJECT_URL
        : import.meta.env.VITE_PRODUCTION_CREATE_PROJECT_URL;

    const { user } = useAuth0();

    const resetForm = () => {
        var form = document.getElementById("project-form");
        form.reset();
    };

    const validateDeadline = (date) => {
    /* Validator package used to confirm that new date is after the current date */

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

        /* Creates an axios post request with the form data to create a new project */
        
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        if (validateDeadline(entries.deadline))
        {
            axios
                .post(CREATE_PROJECT_URL, entries)
                .then((response) => {
                    toast.success("Project created successfully");
                    resetForm();
                })
                .catch((error) => {
                    // console.log(error);
                    return toast.error(error.message);
                });
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
                <form id="project-form" onSubmit={handleSubmit}>
    
                    <label className="form-header" htmlFor="title">Title:</label><br></br>
                    <input 
                        className="form-section input input-bordered input-success w-full"
                        data-testid="title"
                        type="text" 
                        id="title" 
                        name="title"
                        required={true} 
                        placeholder="Project Title"
                    >
                    </input>
    
                    <label htmlFor="projectid" hidden>Team Leader:</label>
                    <input 
                        data-testid="teamleader"
                        type="text" 
                        id="teamleader" 
                        name="teamleader" 
                        required={true} 
                        value={user.name} 
                        readOnly={true} 
                        hidden>
                    </input>
    
                    <label className="form-header" htmlFor="description">Description:</label><br></br>
                    <textarea 
                        className="form-section textarea textarea-success" 
                        data-testid="description"
                        id="description" 
                        name="description"
                        required={true} 
                        rows={8}
                        cols={64}
                        placeholder="Describe the project"
                    >
                    </textarea>
    
                    <label className="form-header" htmlFor="status" hidden>Status:</label> <br></br>
                    <input
                        data-testid="status" 
                        type="text" 
                        id="status" 
                        name="status" 
                        required={true} 
                        value={"In progress"} 
                        readOnly={true} 
                        hidden>
                    </input>
    
                    <label className="form-header" htmlFor="deadline">Deadline: </label>
                    <input
                        className="form-section input input-bordered input-success w-full"
                        data-testid="deadline"
                        type="datetime-local" 
                        id="deadline" 
                        name="deadline"
                        required={true}  
                    >
                    </input>
    
                    <button className="update-form-btn btn btn-success" id="submit-btn" type="submit">Create</button>
    
                </form>
            </div>
        );
    }
};

export default CreateProjectForm;