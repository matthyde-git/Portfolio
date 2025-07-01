import { getAllNotifications, getNotification, getUserNotifications, addNotification, deleteNotification, deleteUserNotifications, addUniqueNotification } from "../models/notifications.js";

// controller for sending user requests to the notifications model

async function getNs(req, res) {
    try {
        const results = await getAllNotifications();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getN(req, res) {
    try {
        const data = req.params.notificationid;
        const result = await getNotification(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getUserNs(req, res) {
    try {
        const name = req.params.username;
        const results = await getUserNotifications(name);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addN(req, res) {
    try {
        const data = req.body;
        const result = await addNotification(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteN(req, res) {
    try {
        const data = req.body.notificationid;
        const result = await deleteNotification(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteUserNs(req, res) {
    try {
        const data = req.body.name;
        const result = await deleteUserNotifications(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addUnique(req, res) {
    try {
        const data = req.body;
        const result = await addUniqueNotification(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getNs, getN, getUserNs, addN, deleteN, deleteUserNs, addUnique };