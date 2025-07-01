import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Message from "./Message.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

import { fetchMessages } from "../../features/messages/messageSlice.js";

const Messages = () => {

    /* 
        Gets the message state from the store containing the project message, 
        then maps them the message components containing the message information,
        also contains the send message form
    */

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

    const { messages, isLoading } = useSelector((store) => store.messages);
    
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(fetchMessages());
    }, []);

    const refreshMessages = () => {
        dispatch(fetchMessages());
    }

    useEffect(() => {
        // useEffect hook re-fetches the projects messages every 5 seconds to display any new messages since the last render
        let interval = setInterval(() => {
            refreshMessages()
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const { user } = useAuth0();
    
    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else
    {
        
        return (
        /*
            displays all the project messages, provides a textarea for users to input messages
        */
            <>
                <div id="breadcrumbs" className="breadcrumbs text-sm" data-testid="prj-msgs-breadcrumbs">
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
                                Messages
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
    
                {
                    messages.length > 0 ? (
                        <div id="msg-box" className="chat-box border-b border-primary overflow-auto">
                            {messages.map((message) => { 
                                return (
                                    <>
                                        <Message message={Object.values(message)} refresh={refreshMessages}/>
                                    </>
                                )
                            })}
                        </div>
                    ) : (
                        <>
                            <p className="project-text">No messages yet, enter a message below</p>
                        </>
                    )
                }
                
                
                <SendMessageForm refresh={refreshMessages} />
    
            </div>
            </> 
        );
    }
};

export default Messages;