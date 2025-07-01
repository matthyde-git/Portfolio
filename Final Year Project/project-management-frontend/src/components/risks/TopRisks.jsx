import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopRisk from "./TopRisk.jsx";

import { fetchTopRisks } from "../../features/risks/riskSlice.js";

const TopRisks = () => {

    /* Renders a list of the top three highest priority project risks in the database */

    const { topRisks, isLoading } = useSelector((store) => store.risks);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchTopRisks());
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <table className="table">

            {
                topRisks.length > 0 ? (
                    <>
                        {topRisks.map((risk) => { 
                            return (
                                <>
                                    <TopRisk topRisk={Object.values(risk)} />
                                </>
                            )
                        })}
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td>
                                <p>No risks yet</p>
                            </td>
                        </tr>
                    </tbody>
                )
            }
            
        </table>
    );
};

export default TopRisks;