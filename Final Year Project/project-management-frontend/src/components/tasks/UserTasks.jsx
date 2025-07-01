import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserTask from "./UserTask.jsx";

import { fetchUserTasks } from "../../features/tasks/taskSlice.js";

const UserTasks = () => {

    // renders all the tasks the user is assigned to

    const navigate = useNavigate();
          
    const navigateToHome = () => {
        navigate("/");
    };
        
    const navigateToTasks = () => {
        navigate("/tasks");
    }; 

    const { userTasks, isLoading } = useSelector((store) => store.tasks);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUserTasks());
    }, []);

    const refreshTasks = () => {
        dispatch(fetchUserTasks());
    }
    
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm" data-testid="tasks-breadcrumbs">
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
                        <a onClick={navigateToTasks}>
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
                            Tasks
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

            <div className="box bg-base-100 card-bordered border-primary overflow-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th></th>
                        </tr>
                    </thead>
        
                    {
                        userTasks.length > 0 ? (
                            <>
                                {userTasks.map((task) => {
                                    return (
                                        <>
                                            <UserTask userTask={task} refresh={refreshTasks}/>
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <p className="project-text">You haven't got any tasks to do at the moment, join a project and select a task.</p>
                            </>
                        )
                    }
                    
                </table> 
            </div>
        </>
    );
};

export default UserTasks;