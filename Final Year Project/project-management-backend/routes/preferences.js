import express from "express";

import { getPs, getP, addP, deleteP, updateTheme, updateFont, getUserPrefs } from "../controllers/preferences.js";

const router = express.Router();

// routes user requests to the preferences controller

router.get("/", (req, res) => {
    getPs(req, res);
});

router.get("/api/preferences/:preferenceid", (req, res) => {
    getP(req, res);
});

router.post("/api/preferences/add", (req, res) => {
    addP(req, res);
});

router.delete("/api/preferences/", (req, res) => {
    deleteP(req, res);
});

router.post("/api/preferences/update/theme", (req, res) => {
    updateTheme(req, res);
});

router.post("/api/preferences/update/font", (req, res) => {
    updateFont(req, res);
});

router.get("/api/preferences/user/:username", (req, res) => {
    getUserPrefs(req, res);
});

export default router;