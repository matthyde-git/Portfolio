import express from 'express';
import { getOs, getO, addO, deleteO, updateO } from '../controllers/order.js';

const router = express.Router();

router.get("/", (req, res) => {
    getOs(req, res);
});

router.get("/api/order/:id", (req, res) => {
    getO(req, res);
});

router.post("/api/order/add", (req, res) => {
    addO(req, res);
});

router.delete("/api/order/", (req, res) => {
    deleteO(req, res);
});

router.post("/api/order/update", (req, res) => {
    updateO(req, res);
});

export default router;