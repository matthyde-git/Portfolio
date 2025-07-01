import db from "../db/db.js";

const getAllContacts = async () => {
    // returns all the rows in the contacts table
    const results = await db
        .select("*")
        .from("contacts");

    return results;
};

const getContact = async (id) => {
    // returns the row in the contacts table with the matching id
    const result = await db
        .select("*")
        .from("contacts")
        .where("id", id);
    
    return result;
};

const addContact = async (data) => {
    // inserts contact information into the contacts table
    const contact = await db("contacts")
        .insert(data)
        .then(() => {
            console.log("Contact created successfully");
        });
};

const deleteContact = async (id) => {
    // deletes the row in the contacts table with the matching id
    const contact = await db("contacts")
        .where("id", id)
        .del()
    
    console.log("Contact deleted successfully");
};

export { getAllContacts, getContact, addContact, deleteContact };