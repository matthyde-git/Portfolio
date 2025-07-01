import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Invite from "./Invite.jsx";

import { fetchInvites } from "../../features/teammembers/teamMemberSlice.js";

const Invites = () => {

    // renders all of the user's project invites

    const navigate = useNavigate();
              
    const navigateToHome = () => {
        navigate("/");
    };
            
    const navigateToProjects = () => {
        navigate("/projects");
    }; 

    const { invites, isLoading } = useSelector((store) => store.team);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInvites());
    }, []);

    const resetInvites = () => {
        dispatch(fetchInvites());
    };
    
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const { user } = useAuth0();

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else
    {
        return (
            <>
                <div id="breadcrumbs" className="breadcrumbs max-w-xs text-sm" data-testid="invites-breadcrumbs">
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
                                Invites
                            </a>
                        </li>
                    </ul>
                </div>

                <span className="badge badge badge-warning indicator-item back-btn hover:cursor-pointer" onClick={navigateToProjects}>

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

                    Back to projects

                </span>    

                <div className="box bg-base-100 card-bordered border-primary overflow-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Team Leader</th>
                                <th>Description</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        {
                            invites.length > 0 ? (
                                <>
                                    {invites.map((invite) => {
                                        return (
                                            <>
                                                <Invite invite={invite} reset={resetInvites}/>
                                            </>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
    
                                </>
                            )
                        }
                    </table> 
                </div>
            </>
        );
    }
};

export default Invites;