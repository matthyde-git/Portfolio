import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectFile = ({ file, refresh }) => {

    /* Renders a project file from the file system, provides a method for downloading files and a method for team leaders to delete project files */

    const DOWNLOAD_URL = import.meta.env.VITE_FILE_DOWNLOAD_URL;

    const DELETE_URL = import.meta.env.VITE_DELETE_FILE_URL;

    const handleDownload = () => {

        /*
            Sends an axios get request to the backend, receives the res.download() value as a binary large object, 
            creates a hidden download link to automatically download the file once the frontend receives the data,
            toast message is used to notify the success or failure of the request
        */

        axios
            .get(DOWNLOAD_URL + sessionStorage.getItem("projectid") + "/" + file, { responseType: "blob"})
            .then((response) => {

                const fileURL = window.URL.createObjectURL(new Blob([response.data]))
                
                const link = document.createElement("a");

                link.href = fileURL;

                link.setAttribute("download", file);

                document.body.appendChild(link);

                link.click();
                
                toast.success("File downloaded successfully");
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to download file");
            })
    }

    const handleDelete = () => {

        /* Creates an axios delete request to delete a project file */

        const fileData = {
            projectid: sessionStorage.getItem("projectid"),
            filename: file
        }

        axios
            .delete(DELETE_URL, {data: fileData})
            .then((response) => {
                toast.success("File deleted successfully");
                 refresh();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to delete file");
            })
    }

    return (
        
            <tbody>

                {
                    sessionStorage.getItem("username") === sessionStorage.getItem("teamleader") ? (
                        <tr>
                            <td className="project-text file-name">{file}</td>
                            <td><button className="btn btn-error del-file-btn" data-testid={file + "-delete-btn"} onClick={() => document.getElementById(file + "del-modal").showModal()}>Delete</button></td>
                            <td><button className="btn btn-info download-btn" data-testid={file + "-download-btn"} onClick={handleDownload}>Download</button></td>
                        </tr>
                    ) : (
                        <tr>
                            <td className="project-text file-name">{file}</td>
                            <td><button className="btn btn-info download-btn" onClick={handleDownload}>Download</button></td>
                        </tr>
                    )
                }
            
                <dialog id={file + "del-modal"} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button 
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                >
                                    ✕
                                </button>
                        </form>

                        <p>Are you sure you want to delete this file? This cannot be undone.</p>
                        
                        <form method="dialog">
                            <button className="btn btn-error del-file-no-btn">No</button>
                            <button className="btn btn-success del-file-yes-btn" data-testid={file + "-confirm-delete-file"} onClick={handleDelete}>Yes</button>
                        </form>
    
                    </div>
                </dialog>

            </tbody>
    );
};

export default ProjectFile;