import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";

import ReplyToMessageForm from "./ReplyToMessageForm.jsx";
import UpdateMessageForm from "./UpdateMessageForm.jsx";

const Message = ({ message, refresh }) => {

    const REPLYING_TO_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_GET_SINGLE_MESSAGE_URL
            : import.meta.env.VITE_PRODUCTION_GET_SINGLE_MESSAGE_URL;

    const DELETE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_DELETE_PROJECT_MESSAGE_URL
            : import.meta.env.VITE_PRODUCTION_DELETE_PROJECT_MESSAGE_URL;

    const [replyMessage, setReplyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const clickReply = () => {
        // shows the reply to message feature
        setIsReplying(true);
        setIsUpdating(false);
        setIsDeleting(false);
    }

    const clickUpdate = () => {
        // shows the updated message feature
        setIsReplying(false);
        setIsUpdating(true);
        setIsDeleting(false);
    }

    const clickDelete = () => {
        // shows the delete message feature
        setIsReplying(false);
        setIsUpdating(false);
        setIsDeleting(true);
    }

    const closeSections = () => {
        // clears the states to reset the modals
        setIsReplying(false);
        setIsUpdating(false);
        setIsDeleting(false);
    };

    const handleDelete = () => {
        // sends the id of message to be deleted to the messages backend
        const id = {
            messageid: message[0]
        }

        axios
            .delete(DELETE_URL, {data: id})
            .then((response) => {
                toast.success("Message deleted successfully");
                closeSections();
                refresh();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to delete message");
            })
    }

    useEffect(() => {
        // useEffect hook to get the information for a message that was replied to and stores it in the reply state
        const getReplyMessage = async () => {
            try {
                if (message[4] !== null)
                {
                    const data = await axios
                        .get(REPLYING_TO_URL + message[4])
                        .then((response) => {
                            setReplyMessage(response.data);
                            setIsLoading(false)
                        })
                }
            } catch (error) {
                // console.log(error);
            }
        }

        getReplyMessage();

    }, []);

    const teamleader = sessionStorage.getItem("teamleader");

    const { user } = useAuth0();

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else if (user.name === message[3])
    // renders if the user is the person who sent the message, returns a message in a blue message box on the right of the screen to indicate that the user sent it
    {
        if (message[4] !== null)
        /* 
            renders if the message is in response to another message, contains a section above the message storing the message that it it is replying to, 
            clicking on the message opens a modal with the reply, update and delete features
        */
        { 
            return (
                <div className="chat chat-end chat-div">

                    <div className="chat-header text-info">
                        {new Date(message[5]).toLocaleString()}
                    </div>

                    <div 
                        className="chat-bubble bg-info chat-item hover:cursor-pointer"
                        onClick={() => document.getElementById(message[0] + "msg-modal").showModal()}
                    >
                        
                        {
                            isLoading ? (
                                <>
                                    <p className="chat-reply text-neutral border-b-2 border-primary-content">Loading...</p>
                                </>
                            ) : (
                                <>
                                    <p className="chat-reply text-neutral border-b-2 border-primary-content" data-testid={message[0] + "message-replying-to"}>Replying to: {replyMessage[0].message}</p>
                                </>
                            )
                        }

                        <p className="chat-msg text-primary-content" data-testid={message[0] + "message-reply"}>{message[2]}</p>

                    </div>

                    <dialog id={message[0] + "msg-modal"} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeSections}
                                    >
                                        ✕
                                </button>
                            </form>

                            <p className="modal-msg">{new Date(message[5]).toLocaleString()}: </p>

                            <p className="modal-msg">{message[2]}</p>
                            
                            {
                                isReplying ? (
                                    <> 

                                        <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>
                                        
                                    </>
                                ) : (
                                    <>
                                        {
                                            isUpdating ? (
                                                <> 

                                                    <UpdateMessageForm message={message} refresh={refresh} closeSections={closeSections} />
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        isDeleting ? (
                                                            <> 
                                                                <p className="text-xl text-center p-2 text-warning">Are you sure you want to delete this message? This cannot be undone.</p>

                                                                <button 
                                                                    className="btn btn-warning del-msg-no"
                                                                    onClick={closeSections}>
                                                                        No
                                                                </button>

                                                                <form method="dialog">
                                                                    <button 
                                                                        className="btn btn-error del-msg-yes"
                                                                        onClick={handleDelete}>
                                                                            Yes
                                                                    </button>
                                                                </form>
                                                                
                                                            </>
                                                        ) : (
                                                            <>

                                                                <button 
                                                                    className="btn btn-info msg-reply"
                                                                    data-testid={message[0] + "msg-reply-btn"}
                                                                    onClick={clickReply}>
                                                                        Reply
                                                                </button>

                                                                <button 
                                                                    className="btn btn-warning msg-update"
                                                                    data-testid={message[0] + "msg-update-btn"}
                                                                    onClick={clickUpdate}>
                                                                        Update
                                                                </button>

                                                                <button 
                                                                    className="btn btn-error msg-delete"
                                                                    data-testid={message[0] + "msg-delete-btn"}
                                                                    onClick={clickDelete}>
                                                                        Delete
                                                                </button>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>
                    </dialog>

                </div>
            );
        }
        else
        /* 
            renders if the message is not in response to another message, clicking on the message opens a modal with the reply, update and delete features
        */
        {
            return (
                <div className="chat chat-end chat-div">

                    <div className="chat-header text-info">
                        {new Date(message[5]).toLocaleString()}
                    </div>

                    <div 
                        className="chat-bubble bg-info text-primary-content chat-item hover:cursor-pointer"
                        data-testid={message[0] + "message"}
                        onClick={() => document.getElementById(message[0] + "msg-modal").showModal()}
                    >
                        {message[2]}
                    </div>

                    <dialog id={message[0] + "msg-modal"} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeSections}
                                    >
                                        ✕
                                </button>
                            </form>
                            
                            <p className="modal-msg">{new Date(message[5]).toLocaleString()}: </p>

                            <p className="modal-msg">{message[2]}</p>
                            
                            {
                                isReplying ? (
                                    <> 

                                        <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>
                                        
                                    </>
                                ) : (
                                    <>
                                        {
                                            isUpdating ? (
                                                <> 

                                                    <UpdateMessageForm message={message} refresh={refresh} closeSections={closeSections} />
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        isDeleting ? (
                                                            <> 
                                                                <p className="text-xl text-center p-2 text-warning">Are you sure you want to delete this message? This cannot be undone.</p>

                                                                <button 
                                                                    className="btn btn-warning del-msg-no"
                                                                    onClick={closeSections}>
                                                                        No
                                                                </button>

                                                                <form method="dialog">
                                                                    <button 
                                                                        className="btn btn-error del-msg-yes"
                                                                        data-testid={message[0] + "confirm-delete-message"}
                                                                        onClick={handleDelete}>
                                                                            Yes
                                                                    </button>
                                                                </form>
                                                                
                                                            </>
                                                        ) : (
                                                            <>

                                                                <button 
                                                                    className="btn btn-info msg-reply"
                                                                    onClick={clickReply}>
                                                                        Reply
                                                                </button>

                                                                <button 
                                                                    className="btn btn-warning msg-update"
                                                                    onClick={clickUpdate}>
                                                                        Update
                                                                </button>

                                                                <button 
                                                                    className="btn btn-error msg-delete"
                                                                    data-testid={message[0] + "delete-message-modal"}
                                                                    onClick={clickDelete}>
                                                                        Delete
                                                                </button>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>
                    </dialog>

                </div>
            );
        }
    }
    else
    // renders if the user did not send the message, returns a grex message box on the left of the screen to indicate that the user did not send it
    {
        if (message[4] !== null)
        /* 
            renders if the message is in response to another message, contains a section above the message storing the message that it it is replying to, 
            clicking on the message opens a modal with the reply, update and delete features only if the user is the team leader
        */
        {
            return (
                <div className="chat chat-start text-content chat-div">

                    <div className="chat-header">
                        {message[3]} {new Date(message[5]).toLocaleString()}
                    </div>

                    <div 
                        className="chat-bubble bg-neutral-content chat-item hover:cursor-pointer"
                        onClick={() => document.getElementById(message[0] + "msg-modal").showModal()}>
                        
                    {
                        isLoading ? (
                            <>
                                <p className="chat-reply text-neutral border-b-2 border-primary-content">Loading...</p>
                            </>
                        ) : (
                            <>
                                {
                                    replyMessage[0].user === user.name ? (
                                        <>
                                            <p className="chat-reply text-neutral bg-info  border-b-2 border-primary-content">Replying to: {replyMessage[0].message}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="chat-reply text-neutral border-b-2 border-primary-content">Replying to: {replyMessage[0].message}</p>
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                        <p className="chat-msg text-primary-content">{message[2]}</p>

                    </div>

                    <dialog id={message[0] + "msg-modal"} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeSections}
                                    >
                                        ✕
                                </button>
                            </form>

                            <p className="modal-msg">{new Date(message[5]).toLocaleString()}: </p>

                            <p className="modal-msg">{message[2]}</p>

                            {
                                user.name === teamleader ? (
                                    <>
                                        {
                                            isReplying ? (
                                                <> 

                                                    <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        isUpdating ? (
                                                            <> 

                                                                <UpdateMessageForm message={message} refresh={refresh} closeSections={closeSections} />
                                                                
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    isDeleting ? (
                                                                        <> 
                                                                            <p className="text-xl text-center p-2 text-warning">Are you sure you want to delete this message? This cannot be undone.</p>

                                                                            <button 
                                                                                className="btn btn-warning del-msg-no"
                                                                                onClick={closeSections}>
                                                                                    No
                                                                            </button>

                                                                            <form method="dialog">
                                                                                <button 
                                                                                    className="btn btn-error del-msg-yes"
                                                                                    onClick={handleDelete}>
                                                                                        Yes
                                                                                </button>
                                                                            </form>
                                                                            
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <button 
                                                                                className="btn btn-info msg-reply"
                                                                                onClick={clickReply}>
                                                                                    Reply
                                                                            </button>

                                                                            <button 
                                                                                className="btn btn-warning msg-update"
                                                                                onClick={clickUpdate}>
                                                                                    Update
                                                                            </button>

                                                                            <button 
                                                                                className="btn btn-error msg-delete"
                                                                                onClick={clickDelete}>
                                                                                    Delete
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            isReplying ? (
                                                <> 
                                                    <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>                                           
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        className="btn btn-info reply-btn"
                                                        onClick={() => setIsReplying(true)}>
                                                            Reply
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>
                    </dialog>

                </div>
            );
        }
        else
        /* 
            renders if the message is not in response to another message, clicking on the message opens a modal with the reply, update and delete features only if the user is the team leader
        */
        {
            return (
                <div className="chat chat-start chat-div">

                    <div className="chat-header text-content">
                        {message[3]} {new Date(message[5]).toLocaleString()}
                    </div>

                    <div 
                        className="chat-bubble bg-neutral-content text-neutral chat-item hover:cursor-pointer"
                        onClick={() => document.getElementById(message[0] + "msg-modal").showModal()}
                    >
                        {message[2]}
                    </div>

                    <dialog id={message[0] + "msg-modal"} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeSections}
                                    >
                                        ✕
                                </button>
                            </form>

                            <p className="modal-msg">{new Date(message[5]).toLocaleString()}: </p>

                            <p className="modal-msg">{message[2]}</p>
                            
                            {
                                user.name === teamleader ? (
                                    <>
                                        {
                                            isReplying ? (
                                                <> 

                                                    <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        isUpdating ? (
                                                            <> 

                                                                <UpdateMessageForm message={message} refresh={refresh} closeSections={closeSections} />
                                                                
                                                            </>
                                                        ) : (
                                                            <>
                                                                {
                                                                    isDeleting ? (
                                                                        <> 
                                                                            <p className="text-xl text-center p-2 text-warning">Are you sure you want to delete this message? This cannot be undone.</p>

                                                                            <button 
                                                                                className="btn btn-warning del-msg-no"
                                                                                onClick={closeSections}>
                                                                                    No
                                                                            </button>

                                                                            <form method="dialog">
                                                                                <button 
                                                                                    className="btn btn-error del-msg-yes"
                                                                                    onClick={handleDelete}>
                                                                                        Yes
                                                                                </button>
                                                                            </form>
                                                                            
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <button 
                                                                                className="btn btn-info msg-reply"
                                                                                onClick={clickReply}>
                                                                                    Reply
                                                                            </button>

                                                                            <button 
                                                                                className="btn btn-warning msg-update"
                                                                                onClick={clickUpdate}>
                                                                                    Update
                                                                            </button>

                                                                            <button 
                                                                                className="btn btn-error msg-delete"
                                                                                onClick={clickDelete}>
                                                                                    Delete
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            isReplying ? (
                                                <> 
                                                    <ReplyToMessageForm message={message} refresh={refresh} setIsReplying={setIsReplying}/>                                                   
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        className="btn btn-info reply-btn"
                                                        onClick={() => setIsReplying(true)}>
                                                            Reply
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>
                    </dialog>

                </div>
            );
        }
    }
};

export default Message;