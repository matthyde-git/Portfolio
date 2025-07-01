import { getAllMessages, getProjectMessages, addProjectMessage, deleteProjectMessage, updateProjectMessage, getRecentProjectMessages, getSingleMessage } from "../models/messages.js";

// controller for sending user requests to the messages model

async function getMessages(req, res) {
    try {
        const results = await getAllMessages();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getProjectMs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getProjectMessages(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function addMessage(req, res) {
    try {
        const data = req.body;
        const results = await addProjectMessage(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteMessage(req, res) {
    try {
        const data = req.body.messageid;
        const results = await deleteProjectMessage(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateMessage(req, res) {
    try {
        const data = req.body;
        const results = await updateProjectMessage(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getRecentProjectMs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getRecentProjectMessages(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function getMessage(req, res) {
    try {
        const messageid = req.params.messageid;
        const results = await getSingleMessage(messageid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export { getMessages, getProjectMs, addMessage, deleteMessage, updateMessage, getRecentProjectMs, getMessage };