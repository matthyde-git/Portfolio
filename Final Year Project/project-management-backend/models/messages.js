import db from "../db/db.js";

const getAllMessages = async () => {
    // gets all the rows from the messages table
    const messages = await db
        .select("*")
        .from("messages")

    return messages;
}

const getProjectMessages = async (projectid) => {
    // get all the messages with the matching projectid in ascending order
    const messages = await db
        .select("*")
        .from("messages")
        .where("projectid", projectid)
        .orderBy([{ column: "created_at", order: "asc" }]);

    return messages;
};

const addProjectMessage = async (data) => {
    // adds a message to the messages table
    const messages = await db("messages")
        .insert(data)
        .then(() => {
            console.log("Message added successfully");
    });
};

const deleteProjectMessage = async (messageid) => {
    // deletes the row from the messages table with the matching id, also updates any messages that were in reply to deleted message
    const message = await db("messages")
        .where("messageid", messageid)
        .del();
        console.log("Message deleted successfully");

    const reply = await db("messages")
        .where("replyingto", messageid)
        .update({
            replyingto: null
        })
};

const updateProjectMessage = async (data) => {
    // updates the message with the matching id
    const message = await db("messages")
        .where("messageid", data.messageid)
        .update({
            message: data.message
        })
};

const getRecentProjectMessages = async (projectid) => {
    // gets the 3 most recent project messages
    const messages = await db
        .select("*")
        .from("messages")
        .where("projectid", projectid)
        .orderBy([{ column: "created_at", order: "desc"}])
        .limit(3);

    return messages;
}

const getSingleMessage = async (messageid) => {
    // gets the message with the matching id
    const message = await db
        .select("*")
        .from("messages")
        .where("messageid", messageid);

    return message;
}

export { getAllMessages, getProjectMessages, addProjectMessage, deleteProjectMessage, updateProjectMessage, getRecentProjectMessages, getSingleMessage };