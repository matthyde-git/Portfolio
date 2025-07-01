import express from "express";

import { getProjects, getP, getUserPs, addP, deleteP, updateP, updateStatus } from "../controllers/projects.js";

const router = express.Router();

// routes user requests to the projects controller

router.get("/", (req, res) => {
    getProjects(req, res);
});

router.get("/api/projects/:projectid", (req, res) => {
    getP(req, res);
});

router.get("/api/projects/user/:username", (req, res) => {
    getUserPs(req, res);
});

router.post("/api/projects/add", (req, res) => {
    addP(req, res);
});

router.delete("/api/projects/", (req, res) => {
    deleteP(req, res);
});

router.post("/api/projects/update", (req, res) => {
    updateP(req, res);
});

router.post("/api/projects/update/status", (req, res) => {
    updateStatus(req, res);
});

export default router;