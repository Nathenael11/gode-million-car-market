import express from "express";
import { createInquiry, getInquiries } from "../controllers/inquiryController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(createInquiry)
  .get(protect, authorize("admin", "seller"), getInquiries);

export default router;
