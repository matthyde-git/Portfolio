import React, { useEffect} from "react";
import validator from "validator";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { fetchTeamMembers } from "../../features/teammembers/teamMemberSlice.js";

const UPDATE_STATUS_URL = 
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_UPDATE_TASK_STATUS_URL
        : import.meta.env.VITE_PRODUCTION_UPDATE_TASK_STATUS_URL;

const NOTIF_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_CREATE_UNIQUE_USER_NOTIF_URL
        : import.meta.env.VITE_PRODUCTION_CREATE_UNIQUE_USER_NOTIF_URL;

const UserTask = ({ userTask, refresh }) => {

    // renders user tasks before the deadline or tasks that are after the deadline but overdue, provides a method for updating a task to done

    const { team } = useSelector((store) => store.team);

    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.setItem("projectid", userTask.projectid)
        dispatch(fetchTeamMembers());
    }, []);

    const deadlineWithinNextWeek = () => {
        /* Validator package used to confirm that the deadline is within the next week */
        
        var weekBeforeDeadline = new Date(userTask.deadline);
        weekBeforeDeadline.setDate(weekBeforeDeadline.getDate() - 7)
            
        return validator.isAfter(new Date().toString(), weekBeforeDeadline.toString());
    }
        
    const overDeadline = () => {
        /* Validator package used to confirm that the deadline has passed */
    
        var deadline = new Date(userTask.deadline);
    
        return validator.isAfter(new Date().toString(), deadline.toString());
    }

    const markAsDone = () => {

        // marks a single user task as done and notifies the project team

        const data = {
            taskid: userTask.taskid,
            newStatus: "Done"
        }

        axios
            .post(UPDATE_STATUS_URL, data)
            .then((response) => {
                refresh();
                toast.success("Task updated successfully");
            })
            .catch((error) => {
                return toast.error(error.message);
            })

        for (var i = 0; i < team.length; i++)
            {
                if (sessionStorage.getItem("username") !== team[i].email)
                {
                    var notifData = {
                        name: team[i].email,
                        message: `${sessionStorage.getItem("username")} has updated task: ${userTask.title} to ${data.newStatus} in project: ${sessionStorage.getItem("project-title")}`,
                        date: new Date()
                    }
    
                    axios
                    .post(NOTIF_URL, notifData)
                    .then((response) => {
                        // console.log("Status updated successfully");
                    })
                    .catch((error) => {
                        // console.log(error.message);
                    })
                }
            }
    }

    if ((new Date(userTask.deadline) < new Date()) || (userTask.status === "To Do") || (userTask.status === "Doing"))
    // renders if the task status is "To Do" or "Doing" or if the task is overdue
    {
        return (
            <tbody>
                <tr className="hover:bg-primary hover:text-base-100">
                    <td data-testid={userTask.taskid + "title"}>{userTask.title}</td>
                    <td>{userTask.description}</td>
                    <td>{userTask.status}</td>

                    {
                        overDeadline() ? (
                            <td className="text-error">
                                {new Date(userTask.deadline).toLocaleString()}
                            </td>                                     
                        ) : (
                            <>
                                {
                                    deadlineWithinNextWeek() ? (
                                        <td className="text-warning" data-testid={userTask.taskid + "deadline"}>
                                            {new Date(userTask.deadline).toLocaleString()}
                                        </td>
                                    ) : (
                                        <td data-testid={userTask.taskid + "deadline"}>
                                            {new Date(userTask.deadline).toLocaleString()}
                                        </td>
                                    )
                                }
                            </>
                        )
                    }

                    <td>
                        <button 
                            className="btn btn-success btn-sm mark-done-btn"
                            data-testid={userTask.taskid + "mark-done-btn"}
                            onClick={markAsDone}>
                                Mark as done
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
    
};

export default UserTask;