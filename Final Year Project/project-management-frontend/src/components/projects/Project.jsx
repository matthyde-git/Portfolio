import React from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Project = ({ project }) => {

    // renders basic information for a single such as title, team leader, description, status and deadline

    const deadlineWithinNextWeek = () => {
    /* Validator package used to confirm that the deadline is within the next week */

        var weekBeforeDeadline = new Date(project.deadline);
        weekBeforeDeadline.setDate(weekBeforeDeadline.getDate() - 7)
    
        return (validator.isAfter(new Date().toString(), weekBeforeDeadline.toString()))
    }

    const overDeadline = () => {
    /* Validator package used to confirm that the deadline has passed */

        var deadline = new Date(project.deadline);
    
        return (validator.isAfter(new Date().toString(), deadline.toString()))
    }

    const navigate = useNavigate();
        
    const navigateToProject = () => {
        sessionStorage.setItem("projectid", project.projectid);
        navigate("/project/overview");
    };

    if (project.description.length < 150)
    {
        return (
            <tbody>
                <tr className="hover:bg-primary hover:text-base-100">
                    <td data-testid={project.projectid + "title"}>{project.title}</td>
                    <td>{project.teamleader}</td>
                    <td>{project.description}</td>
                    <td>{project.status}</td>

                    {
                        overDeadline() ? (
                            <td className="text-error">
                                {new Date(project.deadline).toLocaleString()}
                            </td>
                                    
                        ) : (
                            <>
                                {
                                    deadlineWithinNextWeek() ? (
                                        <td className="text-warning">
                                            {new Date(project.deadline).toLocaleString()}
                                        </td>
                                    ) : (
                                        <td>
                                            {new Date(project.deadline).toLocaleString()}
                                        </td>
                                    )
                                }
                            </>
                        )
                    }
                    
                    <td>

                        <button className="btn btn-info btn-xs" id="view-prj-btn" data-testid={project.projectid + "view-btn"}
                                onClick={navigateToProject}>
                                            View Project
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
    else
    {
        return (
            <tbody>
                <tr className="hover:bg-primary hover:text-base-100">
                    <td>{project.title}</td>
                    <td>{project.teamleader}</td>
                    <td>{project.description.slice(0, 150)}...</td>
                    <td>{project.status}</td>

                    {
                        overDeadline() ? (
                            <td className="text-error">
                                {new Date(project.deadline).toLocaleString()}
                            </td>
                                    
                        ) : (
                            <>
                                {
                                    deadlineWithinNextWeek() ? (
                                        <td className="text-warning">
                                            {new Date(project.deadline).toLocaleString()}
                                        </td>
                                    ) : (
                                        <td>
                                            {new Date(project.deadline).toLocaleString()}
                                        </td>
                                    )
                                }
                            </>
                        )
                    }
                    
                    <td>
                        <button className="btn btn-info btn-xs" data-testid={project.projectid + "view-btn"}
                                onClick={navigateToProject}>
                                            View Project
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
    
};

export default Project;