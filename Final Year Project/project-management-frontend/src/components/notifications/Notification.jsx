import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, refresh }) => {
    
    // displays a notification and the datetime it was sent, provides a method for deleting a notification

    const DELETE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEVELOPMENT_DELETE_SINGLE_NOTIF_URL
            : import.meta.env.VITE_PRODUCTION_DELETE_SINGLE_NOTIF_URL;

    const naviagate = useNavigate();

    const navigateToInvites = () => {
        naviagate("/invites");
    }

    const handleDelete = () => {

        /* Creates an axios delete request to delete a notification */

        const id = {
            notificationid: notification.notificationid
        }

        axios
            .delete(DELETE_URL, {data: id})
            .then((response) => {
                toast.success("Notification cleared successfully");
                refresh();
            })
            .catch((error) => {
                // console.log(error);
                return toast.error("Failed to clear notification");
            })
    }

    if (notification.message === "You have been invited to a project")
    {
        return (
            <tbody>
                <tr className="hover:bg-primary hover:text-base-100 hover:cursor-pointer">
                    <td className="hover:text-base-secondary" data-testid={notification.notificationid + "title"} onClick={navigateToInvites}>{notification.message}</td>
                    <td>
                        {new Date(notification.date).toLocaleString()}
                    </td>
                    <td>
                        <button className="btn btn-sm btn-error del-notif-btn" data-testid={notification.notificationid + "clear-notif-btn"} onClick={handleDelete}>X</button>
                    </td>
                </tr>
            </tbody>
        );
    }
    else {
        return (
            <tbody>
                <tr className="hover:bg-primary hover:text-base-100">
                    <td data-testid={notification.notificationid + "title"}>{notification.message}</td>
                    <td>
                        {new Date(notification.date).toLocaleString()}
                    </td>
                    <td>
                        <button className="btn btn-sm btn-error del-notif-btn" data-testid={notification.notificationid + "clear-notif-btn"} onClick={handleDelete}>X</button>
                    </td>
                </tr>
            </tbody>
        );
    }
};

export default Notification;