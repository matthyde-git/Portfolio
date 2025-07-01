import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Risk from "./Risk.jsx";

import { fetchRisks } from "../../features/risks/riskSlice.js";
import AddRiskForm from "./AddRiskForm.jsx";

const Risks = () => {

    /* Renders a list of risks for a project */

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

    const { risks, isLoading } = useSelector((store) => store.risks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRisks());
    }, []);

    const refreshRisks = () => {
        dispatch(fetchRisks());
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    
    const { user } = useAuth0();

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else if (user.name === sessionStorage.getItem("teamleader"))
    {
    /* Renders if the user is the team leader, provides methods for creating new project risks */
        return (
            <>
                <div id="breadcrumbs" className="breadcrumbs text-sm"  data-testid="prj-risks-breadcrumbs">
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
                                Risks
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
        
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Impact</th>
                                <th>Impact Level (1 - 5)</th>
                                <th>Likelihood (1 - 5)</th>
                                <th>Control</th>
                                <th>Response Strategy</th>
                                <th>Priority (1 - 5)</th>
                            </tr>
                        </thead>

                        {
                            risks.length > 0 ? (
                                <>
                                    {risks.map((risk) => {
                                        return (
                                            <>
                                                <Risk risk={Object.values(risk)} refresh={refreshRisks} />
                                            </>
                                        )
                                    })}
                                </>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="project-text">No risks yet, add a risk below</td>
                                    </tr>
                                </tbody>
                            )
                        }
        
                        
                    </table>

                    <button 
                        className="btn btn-success risk-btn"
                        onClick={() => document.getElementById("add-risk-modal").showModal()}
                    >
                        Add Risk
                    </button>

                    <dialog id="add-risk-modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={refreshRisks}
                                    >
                                        ✕
                                    </button>
                            </form>
                            
                            <AddRiskForm />
        
                        </div>
                    </dialog>

                </div>
            </>
        );  
    }
    else {
    /* Renders if the user is not the team leader, just displays the list of project risks */
        return (
            <>
                <div id="breadcrumbs" className="breadcrumbs text-sm" data-testid="prj-risks-breadcrumbs">
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
                                Risks
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
        
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Impact</th>
                                <th>Impact Level (1 - 5)</th>
                                <th>Likelihood (1 - 5)</th>
                                <th>Control</th>
                                <th>Response Strategy</th>
                                <th>Priority (1 - 5)</th>
                            </tr>
                        </thead>
        
                        {
                            risks.length > 0 ? (
                                <>
                                    {risks.map((risk) => {
                                        return (
                                            <>
                                                <Risk risk={Object.values(risk)} refresh={refreshRisks} />
                                            </>
                                        )
                                    })}
                                </>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="project-text">No risks yet, wait for the team leader to add a risk</td>
                                    </tr>
                                </tbody>
                            )
                        }

                    </table>
                </div>
            </>
        );  
    }
};

export default Risks;