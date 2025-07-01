import express from "express";

import { getRisks, getProjectRs, addRisk, deleteRisk, updateRisk, getTopRs } from "../controllers/risks.js";

const router = express.Router();

// routes user requests to the risks controller

router.get("/", (req, res) => {
    getRisks(req, res);
});

router.get("/api/risks/:projectid", (req, res) => {
    getProjectRs(req, res);
});

router.post("/api/risks/add", (req, res) => {
    addRisk(req, res);
});

router.delete("/api/risks/", (req, res) => {
    deleteRisk(req, res);
});

router.post("/api/risks/update", (req, res) => {
    updateRisk(req, res);
});

router.get("/api/risks/top/:projectid", (req, res) => {
    getTopRs(req, res);
});

export default router;