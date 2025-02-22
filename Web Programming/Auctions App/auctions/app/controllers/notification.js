import { getAllNotifications, addNotification, deleteNotifications, clearUsersNotifications } from "../models/notification.js";

async function getNs(req, res) {
    try {
        const results = await getAllNotifications();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function addN(req, res) {
    try {
        const data = req.body;
        const results = await addNotification(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function clearNs(req, res) {
    try {
        const email = req.body.email;
        const results = await clearUsersNotifications(email);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function delNs(req, res) {
    try {
        const results = await deleteNotifications();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export { getNs, addN, clearNs, delNs };