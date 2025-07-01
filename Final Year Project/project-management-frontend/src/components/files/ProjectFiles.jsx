import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProjectFile from "./ProjectFile.jsx";

import { fetchFiles } from "../../features/files/fileSlice.js";
 
const ProjectFiles = () => {

    /* Renders all the project files in the backend file system, provides a method for uploading files */

    const UPLOAD_URL = import.meta.env.VITE_FILE_UPLOAD_URL;

    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

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

    const { files } = useSelector((store) => store.files);
                
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFiles());
    }, []);

    const refresh = () => {
        dispatch(fetchFiles());
    };

    const updateFiles = () => {
    // delayed to give the backend time to store the file
        setTimeout(refresh, 5000);
    };

    const resetForm = () => {
        var form = document.getElementById("file-form");
        form.reset();
    };

    const { team } = useSelector((store) => store.team);

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData(e.currentTarget);

        axios
            .post(UPLOAD_URL, data)
            .then((response) => {
                toast.success("File uploaded successfully");
                resetForm();
                updateFiles();
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
                            message: `There are new files in project: ${sessionStorage.getItem("project-title")}`,
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
    
    return (
        <>

                <div id="breadcrumbs" className="breadcrumbs text-sm" data-testid="prj-files-breadcrumbs">
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
                                Files
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

            <div className="box bg-base-100 card-bordered border-primary overflow-auto">
                <table className="table tables">

                    {
                        sessionStorage.getItem("username") === sessionStorage.getItem("teamleader") ? (
                            <thead>
                                <tr>
                                    <th>File</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                        ) : (
                            <thead>
                                <tr>
                                    <th>File</th>
                                    <th></th>
                                </tr>
                            </thead>
                        )
                    }

                    {
                        files.length > 0 ? (
                            <>
                                {files.map((file) => {
                                    return (
                                        <>
                                            <ProjectFile file={file} refresh={refresh}/>
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            
                            <tbody>
                                <tr>
                                    <td className="project-text">No files yet, upload a file below</td>
                                </tr>
                            </tbody>
                        )
                    }

                </table>
            </div>

            <form onSubmit={handleSubmit} id="file-form" encType="multipart/form-data" className="file-form">
                   
                <input
                    className="text-xl file-input file-input-primary"
                    data-testid="select-file-input"
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*, .pdf, .txt" 
                    required={true}
                />
   
                <input
                    type="number" 
                    id="projectid" 
                    name="projectid"
                    required={true} 
                    value={sessionStorage.getItem("projectid")}
                    readOnly={true}
                    hidden>
                </input>
                   
                <button className="btn btn-success file-upload-btn" data-testid="upload-btn" type="submit">Upload</button>
   
            </form>
        </>
        
    );  
};

export default ProjectFiles;