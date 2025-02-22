import express from 'express';
import { getCs, getC, addC, deleteC } from '../controllers/contact.js';

const router = express.Router();

router.get("/", (req, res) => {
    getCs(req, res);
});

router.get("/api/contact/:id", (req, res) => {
    getC(req, res);
});

router.post("/api/contact/add", (req, res) => {
    addC(req, res);
});

router.delete("/api/contact/", (req, res) => {
    deleteC(req, res);
});

export default router;