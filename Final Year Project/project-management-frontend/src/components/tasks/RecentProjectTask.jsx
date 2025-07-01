import React from "react";

const RecentProjectTask = ({ recentProjectTask }) => {

    // displays a single task that has an close deadline

    return (
        <tbody>
            <tr>
                <td>{recentProjectTask.title} - {new Date(recentProjectTask.deadline).toLocaleString()}</td>
            </tr>
        </tbody>
    );
};

export default RecentProjectTask;