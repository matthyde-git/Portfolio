import db from "../db/db.js";

const getAllContacts = async () => {
    const results = await db
        .select("*")
        .from("contacts")
        return results;
};

const getContact = async (id) => {
    const results = await db
        .select("*")
        .from("contacts")
        .where("id", id)
        return results;
};

const addContact = async (data) => {
    const contact = await db("contacts")
        .insert(data)
        .then(() => {
            console.log("Contact created successfully");
        });
};

const deleteContact = async (id) => {
    const results = await db("contacts")
        .where("id", id)
        .del()
        console.log("Contact successfully deleted");
};

export { getAllContacts, getContact, addContact, deleteContact };