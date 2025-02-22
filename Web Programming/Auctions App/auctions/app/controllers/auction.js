import { getAllAuctions, getAuction, addAuction, deleteAuction, updateHighestBidder, getAuctionInfo, setNotificationStatus } from "../models/auction.js";

async function getAs(req, res) {
    try {
        const results = await getAllAuctions();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function getA(req, res) {
    try {
        const data = req.params.id;
        const results = await getAuction(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function addA(req, res) {
    try {
        const data = req.body;
        const results = await addAuction(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function deleteA(req, res) {
    try {
        const data = req.body.id;
        const results = await deleteAuction(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function updateA(req, res) {
    try {
        const id = req.body.auctionid;
        const name = req.body.username;
        const amount = req.body.bid;
        const results = await updateHighestBidder(id, name, amount);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function getInfo(req, res) {
    try {
        const id = req.body.id;
        const results = await getAuctionInfo(id);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.error(500).json(error);
    }
};

async function updateNotified(req, res) {
    try {
        const id = req.body.id;
        const results = await setNotificationStatus(id);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.error(500).json(error);
    }
}

export { getAs, getA, addA, deleteA, updateA, getInfo, updateNotified };