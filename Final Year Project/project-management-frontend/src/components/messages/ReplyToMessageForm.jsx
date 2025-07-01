import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const ReplyToMessageForm = ({ message, refresh, setIsReplying }) => {

    // form for the users to reply to another message

    const { team } = useSelector((store) => store.team);

    const ADD_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_ADD_PROJECT_MESSAGE_URL
            : import.meta.env.VITE_PRODUCTION_ADD_PROJECT_MESSAGE_URL;
    
    const NOTIF_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

    const resetForm = () => {
        var form = document.getElementById("reply-form");
        form.reset();
    };

    const handleSubmit = (e) => {
        // sends the message data to the messages backend, returns relevant toast message

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        axios
            .post(ADD_URL, entries)
            .then((response) => {
                resetForm();
                refresh();
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
                        message: `There are new messages in project: ${sessionStorage.getItem("project-title")}`,
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

    const { user } = useAuth0();

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else
    {
        return (
            <form id="reply-form" onSubmit={handleSubmit}>
                <label className="form-header" htmlFor="projectid" hidden>ProjectID:</label><br></br>
                <input 
                    className="form-section input input-bordered input-success"
                    type="number" 
                    id="projectid" 
                    name="projectid"
                    required={true} 
                    value={sessionStorage.getItem("projectid")}
                    readOnly={true}
                    hidden
                >
                </input>
                                
                <label htmlFor="user" hidden>User:</label>
                <input
                    className="form-section input input-bordered input-success"
                    type="text" 
                    id="user" 
                    name="user" 
                    required={true} 
                    value={user.name} 
                    readOnly={true} 
                    hidden
                >
                </input>

                <label htmlFor="replyingto" hidden>ReplyingTo:</label>
                <input
                    className="form-section input input-bordered input-success"
                    type="number" 
                    id="replyingto" 
                    name="replyingto" 
                    required={true} 
                    value={message[0]} 
                    readOnly={true} 
                    hidden
                >
                </input>
                                
                <textarea 
                    className="form-section textarea textarea-info"
                    data-testid={message[0] + "reply-message-form-input"}
                    id="message" 
                    name="message"
                    rows={1}
                    cols={64}
                    required={true}
                    placeholder="Type your message here"
                >
                </textarea>

                <button 
                    className="btn btn-warning reply-form-btn"
                    onClick={() => setIsReplying(false)}>
                        Cancel
                    </button>
                                        
                <button className="btn btn-info reply-form-btn" data-testid={message[0] + "reply-message-form-btn"} type="submit">Send</button>
            </form>
        );
    }
};

export default ReplyToMessageForm;