import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecentProjectMessage from "./RecentProjectMessage.jsx";

import { fetchRecentMessages } from "../../features/messages/messageSlice.js";

const RecentProjectMessages = () => {

    /* 
        Gets the recentMessages state from the store containing the 3 most recent project messages, 
        then maps them the messages components containing the messages information 
    */

    const { recentMessages, isLoading } = useSelector((store) => store.messages);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchRecentMessages());
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <table className="table">
            
            {
                recentMessages.length > 0 ? (
                    <>
                        {recentMessages.map((message) => { 
                            return (
                                <>
                                    <RecentProjectMessage message={Object.values(message)} />
                                </>
                            )
                        })}
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td>
                                <p>No messages yet</p>
                            </td>
                        </tr>
                    </tbody>
                )
            }
            
        </table>
    );
};
 export default RecentProjectMessages;