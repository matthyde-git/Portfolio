import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecentProjectTask from "./RecentProjectTask.jsx";

import { fetchRecentTasks } from "../../features/tasks/taskSlice.js";

const RecentProjectTasks = () => {

    // renders the three project tasks with the closest deadlines

    const { recentProjectTasks, isLoading } = useSelector((store) => store.tasks);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchRecentTasks());
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <table className="table">

            {
                recentProjectTasks.length > 0 ? (
                    <>
                        {recentProjectTasks.map((task) => { 
                            return (
                                <>
                                    <RecentProjectTask recentProjectTask={task} />
                                </>
                            )
                        })}
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td>
                                <p>No tasks to do currently</p>
                            </td>
                        </tr>
                    </tbody>
                )
            }
            
        </table>
    );
};

export default RecentProjectTasks;