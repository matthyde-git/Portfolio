import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Auction from "./src/auctions/Auction";
import { fetchAuctions, getSingleAuction, getAuctionsByCategory, sortAuctionsByLatestDate } from "./src/features/auctions/auctionSlice";

const Auctions = () => {

    const { auctions, isLoading } = useSelector((store) => store.auctions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuctions());
    }, []);

    const resetAuctions = () => {
        dispatch(fetchAuctions());
    };

    const setActiveAuction = (id) => {
        dispatch(getSingleAuction(id));
    }

    const filterByCategory = (category) => {
        dispatch(getAuctionsByCategory(category));
    }

    const filterByLatestDate = () => {
        dispatch(sortAuctionsByLatestDate());
    }

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    const FilterMenu = () => {
    /* returns the buttons that filter the auctions */    
        return (
            <section className="filter-menu">
                <button id="menu-btn" className="btn btn-primary" onClick={resetAuctions}>All</button> 
                <button id="menu-btn" className="btn btn-primary" onClick={() => {filterByLatestDate()}}>latest date</button>
                <button id="menu-btn" className="btn btn-primary" onClick={() => {filterByCategory("men's clothing")}}>men's clothing</button>
                <button id="menu-btn" className="btn btn-primary" onClick={() => {filterByCategory("jewelery")}}>jewelery</button>
                <button id="menu-btn" className="btn btn-primary" onClick={() => {filterByCategory("electronics")}}>electronics</button>
                <button id="menu-btn" className="btn btn-primary" onClick={() => {filterByCategory("women's clothing")}}>women's clothing</button>
            </section>
        );
    }

    return (
    /* maps all the db auctions to components and passes them the reducer functions */    
        <>
            <FilterMenu />

            <div className="auctions">
                {auctions.map((auction) => {
                    return <Auction auction={auction} reset={resetAuctions} active={setActiveAuction} key={auction.id} />
                })}
            </div>
        </>
    );
};

export default Auctions;