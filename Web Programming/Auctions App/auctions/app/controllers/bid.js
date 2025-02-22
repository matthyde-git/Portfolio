import { getAllBids, addBid, deleteBids } from "../models/bid.js";

async function getBs(req, res) {
    try {
        const results = await getAllBids();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function addB(req, res) {
    try {
        const id = req.body.auctionid;
        const name = req.body.nickname;
        const amount = req.body.bid;
        const results = await addBid(id, name, amount);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function delBs(req, res) {
    try {
        const results = await deleteBids();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export { getBs, addB, delBs };