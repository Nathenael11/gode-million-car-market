import express from "express";
import { bookTestDrive, getTestDrives } from "../controllers/testDriveController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(bookTestDrive)
  .get(protect, authorize("admin", "seller"), getTestDrives);

export default router;
