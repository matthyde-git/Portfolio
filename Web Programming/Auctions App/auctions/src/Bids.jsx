import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Bid from "./src/auctions/Bid";
import { fetchBids } from "./src/features/bids/bidSlice"; 

const Bids = ({ id }) => {

    const { bids, isLoading } = useSelector((store) => store.bids);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBids());
    }, []);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        /* maps the db bids to components if their auctionid value matches the id value passed into the component*/  
        <div className="bids">
            <h3>Bid History</h3>
                {bids.map((bid) => {
                    if (bid.auctionid === id)
                    {
                        return <Bid bidInfo={bid} key={bid.id} />
                    }
                })}
        </div>
    );
};

export default Bids;