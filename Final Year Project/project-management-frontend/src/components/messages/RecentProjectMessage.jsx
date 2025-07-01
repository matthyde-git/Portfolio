import React from "react";

const RecentProjectMessage = ( { message }) => {

    // contains the message information shown on the detailed projects page, slices it if its too long to be displayed

    return (
        <tbody>
            <tr>
                <td>
                    {
                        message[2].length < 30 ? (
                            <>
                                <p>{message[3]} at {new Date(message[5]).toLocaleTimeString()} - {message[2]}</p>
                            </>
                        ) : (
                            <>
                                <p>{message[3]} at {new Date(message[5]).toLocaleTimeString()} - {message[2].slice(0, 30) + "..."}</p>
                            </>
                        )
                    }
                </td>
            </tr>
        </tbody>
    );
};

export default RecentProjectMessage;