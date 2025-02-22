import db from "../db/db.js"

const getAllBids = async () => {
    const results = await db
        .select("*")
        .from("bids")
        .orderBy([{ column: "bid", order: "desc"}])
        return results;
};

const addBid = async (id, name, amount) => {
    const bid = await db("bids")
    .insert({
        auctionid: id, 
        username: name,
        bid: amount
    })
    .then(() => {
        console.log("Bid created successfully");
    });
};

const deleteBids = async () => {
    const results = await db("bids")
    .del()
    console.log("Bids successfully deleted");
};

export { getAllBids, addBid, deleteBids };