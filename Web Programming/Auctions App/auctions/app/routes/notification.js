import express from 'express';
import { getNs, addN, clearNs, delNs } from '../controllers/notification.js';

const router = express.Router();

router.get("/", (req, res) => {
    getNs(req, res);
});

router.post("/api/notification/add", (req, res) => {
    addN(req, res);
});

router.post("/api/notification/clear", (req, res) => {
    clearNs(req, res);
})

router.delete("/api/notification/", (req, res) => {
    delNs(req, res);
});

export default router;