import express from "express";

import { getNs, getN, getUserNs, addN, deleteN, deleteUserNs, addUnique } from "../controllers/notifications.js";

const router = express.Router();

// routes user requests to the notifications controller

router.get("/", (req, res) => {
    getNs(req, res);
});

router.get("/api/notifications/:notificationid", (req, res) => {
    getN(req, res);
});

router.get("/api/notifications/user/:username", (req, res) => {
    getUserNs(req, res);
});

router.post("/api/notifications/add", (req, res) => {
    addN(req, res);
});

router.delete("/api/notifications/", (req, res) => {
    deleteN(req, res);
});

router.delete("/api/notifications/user/delete/", (req, res) => {
    deleteUserNs(req, res);
});

router.post("/api/notifications/add/unique", (req, res) => {
    addUnique(req, res);
});

export default router;