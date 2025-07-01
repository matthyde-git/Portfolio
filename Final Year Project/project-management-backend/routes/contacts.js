import express from "express";

import { getContacts, getC, addC, deleteC } from "../controllers/contacts.js";

const router = express.Router();

// routes user requests to the contacts controller

router.get("/", (req, res) => {
    getContacts(req, res);
});

router.get("/api/contacts/:id", (req, res) => {
    getC(req, res);
});

router.post("/api/contacts/add", (req, res) => {
    addC(req, res);
});

router.delete("/api/contacts/", (req, res) => {
    deleteC(req, res);
})

export default router;