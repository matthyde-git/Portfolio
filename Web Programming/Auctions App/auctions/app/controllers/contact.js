import { getAllContacts, getContact, addContact, deleteContact } from "../models/contact.js";

async function getCs(req, res) {
    try {
        const results = await getAllContacts();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function getC(req, res) {
    try {
        const data = req.params.id;
        const results = await getContact(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function addC(req, res) {
    try {
        const data = req.body;
        console.log("Controller req.body : " + req.body);
        const results = await addContact(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function deleteC(req, res) {
    try {
        const data = req.body.id;
        const results = await deleteContact(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export { getCs, getC, addC, deleteC };