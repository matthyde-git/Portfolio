import { getAllContacts, getContact, addContact, deleteContact } from "../models/contacts.js";

// controller for sending user requests to the contacts model

async function getContacts(req, res) {
    try {
        const results = await getAllContacts();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getC(req, res) {
    try {
        const data = req.params.id;
        const results = await getContact(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addC(req, res) {
    try {
        const data = req.body;
        const results = await addContact(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteC(req, res) {
    try {
        const data = req.body.id;
        const results = await deleteContact(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getContacts, getC, addC, deleteC };