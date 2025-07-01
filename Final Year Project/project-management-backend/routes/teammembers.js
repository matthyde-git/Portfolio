import express from "express";

import { getAllTeamMembers, getProjectMembers, addMember, removeMember, accept, reject, getIs } from "../controllers/teammembers.js";

const router = express.Router();

// routes user requests to the teammembers controller

router.get("/", (req, res) => {
    getAllTeamMembers(req, res);
});

router.get("/api/teammembers/project/:projectid", (req, res) => {
    getProjectMembers(req, res);
});

router.post("/api/teammembers/add", (req ,res) => {
    addMember(req, res);
});

router.delete("/api/teammembers/", (req, res) => {
    removeMember(req, res);
});

router.post("/api/teammembers/accept", (req, res) => {
    accept(req, res);
});

router.post("/api/teammembers/reject", (req, res) => {
    reject(req, res);
});

router.get("/api/teammembers/:email", (req, res) => {
    getIs(req, res);
});

export default router;