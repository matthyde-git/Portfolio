import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateMessageForm = ({ message, refresh, closeSections }) => {

    // form for the user to update their messages

    const UPDATE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_UPDATE_PROJECT_MESSAGE_URL
            : import.meta.env.VITE_PRODUCTION_UPDATE_PROJECT_MESSAGE_URL;

    const resetForm = () => {
        var form = document.getElementById("update-msg-form");
        form.reset();
    };

    const handleSubmit = (e) => {
        // sends the updated message data to the messages backend, returns relevant toast message

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entries = Object.fromEntries(data);

        axios
            .post(UPDATE_URL, entries)
            .then((response) => {
                resetForm();
                refresh();
                closeSections();
                toast.success("Message updated successfully");
            })
            .catch((error) => {
                // console.log(error);
                return toast.error(error.message);
            });
    }

    const { user } = useAuth0();

    if (user === undefined)
    {
        return <p>Loading...</p>
    }
    else 
    {
        return (
            <form id="update-msg-form" onSubmit={handleSubmit}>
                <label className="form-header" htmlFor="messageid" hidden>MessageID:</label><br></br>
                <input 
                    className="form-section input input-bordered input-success"
                    type="number" 
                    id="messageid" 
                    name="messageid"
                    required={true} 
                    value={message[0]}
                    readOnly={true}
                    hidden
                >
                </input>
                                
                <textarea 
                    className="form-section textarea textarea-warning"
                    data-testid={message[0] + "update-message"}
                    id="message" 
                    name="message"
                    rows={1}
                    cols={64}
                    required={true}
                    defaultValue={message[2]}
                >
                </textarea>

                <button 
                    className="btn btn-warning reply-form-btn"
                    onClick={closeSections}>
                        Cancel
                    </button>
                                        
                <button className="btn btn-success reply-form-btn" data-testid={message[0] + "update-message-btn"} type="submit">Update</button>
            </form>
        );
    }
};

export default UpdateMessageForm;