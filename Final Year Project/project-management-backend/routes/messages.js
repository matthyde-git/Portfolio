import express from "express";

import { getMessages, getProjectMs, addMessage, deleteMessage, updateMessage, getRecentProjectMs, getMessage } from "../controllers/messages.js";

const router = express.Router();

// routes user requests to the messages controller

router.get("/", (req, res) => {
    getMessages(req, res);
});

router.get("/api/messages/project/:projectid", (req, res) => {
    getProjectMs(req, res);
});

router.post("/api/messages/add", (req, res) => {
    addMessage(req, res);
});

router.delete("/api/messages/", (req, res) => {
    deleteMessage(req, res);
});

router.post("/api/messages/update", (req, res) => {
    updateMessage(req, res);
});

router.get("/api/messages/recent/:projectid", (req, res) => {
    getRecentProjectMs(req, res);
});

router.get("/api/messages/:messageid", (req, res) => {
    getMessage(req, res);
});

export default router;