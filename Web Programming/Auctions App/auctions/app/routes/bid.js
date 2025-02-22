import express from 'express';
import { getBs , addB, delBs } from '../controllers/bid.js'

const router = express.Router();

router.get("/", (req, res) => {
    getBs(req, res);
});

router.post("/api/bid/add", (req, res) => {
    addB(req, res);
});

router.delete("/api/bid/", (req, res) => {
    delBs(req, res);
});

export default router;