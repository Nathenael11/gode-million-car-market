import express from "express";
import { estimateCarPrice } from "../controllers/estimatorController.js";

const router = express.Router();

router.post("/", estimateCarPrice);

export default router;
