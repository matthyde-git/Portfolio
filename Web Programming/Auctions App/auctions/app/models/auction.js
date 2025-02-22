import db from "../db/db.js";

const getAllAuctions = async () => {
    const results = await db
        .select("*")
        .from("newauctions")
        .orderBy([{ column: "id", order: "asc"}])
        return results;
};

const getAuction = async (id) => {
    const results = await db
        .select("*")
        .from("newauctions")
        .where("id", id)
        return results;
};

const addAuction = async (data) => {
    const auction = await db("newauctions")
        .insert(data)
        .then(() => {
            console.log("Auction created successfully");
        });
};

const deleteAuction = async (id) => {
    const results = await db("newauctions")
        .where("id", id)
        .del()
        console.log("Auction successfully deleted");
};

const updateHighestBidder = async (id, name, amount) => {
    const results = await db("newauctions")
        .where("id", id)
        .update({
            winner: name,
            highestBid: amount
        });
};

const getAuctionInfo = async(id) => {
    const results = await db("newauctions")
        .where("id", id)
        .select("winner", "highestBid");
};

const setNotificationStatus = async(id) => {
    const results = await db("newauctions")
        .where("id", id)
        .update({
            notified: true
        });
};

export { getAllAuctions, getAuction, addAuction, deleteAuction, updateHighestBidder, getAuctionInfo, setNotificationStatus };