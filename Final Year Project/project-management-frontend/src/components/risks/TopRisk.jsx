import React from "react";

const TopRisk = ({ topRisk }) => {

    /* Displays the information for a single, high priority level project risk */

    return (
        <tbody>
            <tr>
                <td className="hover:text-primary hover:cursor-pointer"
                    onClick={() => document.getElementById(topRisk[0] + "risk-modal").showModal()}
                    >
                        {
                            topRisk[2].length < 60 ? (
                                <>
                                    {topRisk[2]}
                                </>
                            ) : (
                                <>
                                    {topRisk[2].slice(0, 60) + "..."}
                                </>
                            )
                        }
                </td>
            </tr>

            <dialog id={topRisk[0] + "risk-modal"} className="modal">
                <div className="modal-box w-11/12 max-w-7xl bg-primary text-primary-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                    </form>
                                        
                    <table className="table">

                    <thead>
                        <tr>
                            <th className="text-primary-content">Title</th>
                            <th className="text-primary-content">Category</th>
                            <th className="text-primary-content">Impact</th>
                            <th className="text-primary-content">Impact Level (1 - 5)</th>
                            <th className="text-primary-content">Likelihood (1 - 5)</th>
                            <th className="text-primary-content">Control</th>
                            <th className="text-primary-content">Response Strategy</th>
                            <th className="text-primary-content">Priority (1 - 5)</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        <tr>
                            <td>{topRisk[2]}</td>
                            <td>{topRisk[3]}</td>
                            <td>{topRisk[4]}</td>
                            <td>{topRisk[5]}</td>
                            <td>{topRisk[6]}</td>
                            <td>{topRisk[7]}</td>
                            <td>{topRisk[8]}</td>
                            <td>{topRisk[9]}</td>
                        </tr>
                    </tbody>

                </table> 
                    
                </div>
            </dialog>
        </tbody>
    );
};

export default TopRisk;