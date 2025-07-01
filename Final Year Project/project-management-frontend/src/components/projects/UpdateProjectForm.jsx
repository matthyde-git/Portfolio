import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useSelector } from "react-redux";

const UpdateProjectForm = ({ project }) => {

    // form for updating an existing project

    const { team } = useSelector((store) => store.team);

    const UPDATE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_UPDATE_PROJECT_URL
        : import.meta.env.VITE_PRODUCTION_UPDATE_PROJECT_URL;

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const validateDeadline = (date) => {
    // validator package checks that the user input is a valid email address

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

        // creates an axios post request to update a project, then notifies the team

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        if (validateDeadline(entries.deadline))
        {
            axios
                .post(UPDATE_URL, entries)
                .then((response) => {
                    toast.success("Project updated successfully");
                })
                .catch((error) => {
                    // console.log(error);
                    return toast.error(error.message);
                });

            for (let i = 0; i < team.length; i++)
            {
                if (team[i].email !== sessionStorage.getItem("teamleader"))
                {
                    if (team[i].acceptedinvite === true)
                    {
                        // sends the users that have accepted invites to the project a notification

                        const data = {
                            name: team[i].email,
                            message: `Project: ${entries.title} has been updated`,
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
            return toast.error("Invalid date")
        }
    }

    const formatDate = () => {

        const date = project[5].slice(0, 19);
        
        return date;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="projectid" hidden>ProjectID:</label>
                <input 
                    type="number" 
                    id="projectid" 
                    name="projectid" 
                    required={true} 
                    value={project[0]} 
                    readOnly={true} 
                    hidden>
                </input>

                <label className="form-header" htmlFor="title">Title:</label><br></br>
                <input 
                    className="form-section input input-bordered input-warning w-full"
                    data-testid="title"
                    type="text" 
                    id="title" 
                    name="title" 
                    defaultValue={project[1]}
                >
                </input>

                <br></br>

                <label className="form-header" htmlFor="description">Description:</label><br></br>
                <textarea 
                    className="form-section textarea textarea-warning"
                    data-testid="description"
                    id="description" 
                    name="description"
                    rows={8}
                    cols={64}
                    defaultValue={project[3]}
                >
                </textarea>

                <br></br>

                <label className="form-header" htmlFor="status">Status:</label> <br></br>
                <select 
                    className="form-section input input-bordered input-warning w-full"
                    data-testid="status"
                    id="status" 
                    name="status" 
                    required={true} 
                    defaultValue={project[4]}
                >
                    <option value={"In progress"}>In progress</option>
                    <option value={"Overdue"}>Overdue</option>
                    <option value={"Completed"}>Completed</option>
                </select>

                <br></br>

                <label className="form-header" htmlFor="deadline">Deadline: </label>
                <input
                    className="form-section input input-bordered input-warning w-full"
                    data-testid="deadline"
                    type="datetime-local" 
                    id="deadline" 
                    name="deadline" 
                    defaultValue={formatDate()}
                >
                </input>

                <button className="update-form-btn btn btn-warning" type="submit" data-testid="update-btn">Update</button>

            </form>
        </div>
    );
};

export default UpdateProjectForm;