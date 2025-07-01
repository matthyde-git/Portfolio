import express from "express";

import { getTs, getT, getProjectTs, getProjectT, getRecentProjectTs, getUserProjectT, getUserT, addT, deleteT, updateT, updateAssignment, updateStatus } from "../controllers/tasks.js";

const router = express.Router();

// routes user requests to the tasks controller

router.get("/", (req, res) => {
    getTs(req, res);
});

router.get("/api/tasks/:taskid", (req, res) => {
    getT(req, res);
});

router.get("/api/tasks/project/:projectid", (req, res) => {
    getProjectTs(req, res);
});

router.get("/api/tasks/project/recent/:projectid", (req, res) => {
    getRecentProjectTs(req, res);
});

router.get("/api/tasks/project/:projectid/:taskid", (req, res) => {
    getProjectT(req, res);
});

// this should probably be a GET request like the above but this may also work
router.post("/api/tasks/project/usertasks", (req, res) => {
    getUserProjectT(req, res);
});

router.get("/api/tasks/user/:username", (req, res) => {
    getUserT(req, res);
});

router.post("/api/tasks/add", (req, res) => {
    addT(req, res);
});

router.delete("/api/tasks/", (req, res) => {
    deleteT(req, res);
});

router.post("/api/tasks/update", (req, res) => {
    updateT(req, res);
});

router.post("/api/tasks/update/assignment", (req, res) => {
    updateAssignment(req, res);
});

router.post("/api/tasks/update/status", (req, res) => {
    updateStatus(req, res);
});

export default router;