import express from 'express';
import { getAs, getA, addA, deleteA, updateA, getInfo, updateNotified } from '../controllers/auction.js';

const router = express.Router();

router.get("/", (req, res) => {
    getAs(req, res);
});

router.get("/api/auction/:id", (req, res) => {
    getA(req, res);
});

router.post("/api/auction/add", (req, res) => {
    addA(req, res);
});

router.delete("/api/auction/", (req, res) => {
    deleteA(req, res);
});

router.post("/api/auction/update", (req, res) => {
    updateA(req, res);
});

router.get("/api/auction/info", (req, res) => {
    getInfo(req, res);
});

router.post("/api/auction/notified", (req, res) => {
    updateNotified(req, res);
});

export default router;