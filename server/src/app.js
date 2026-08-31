import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import testDriveRoutes from "./routes/testDriveRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import estimatorRoutes from "./routes/estimatorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Gode and Million Car Market API (ጎዴ እና ሚሊየን የመኪና መሸጫ)",
    location: "Bole Rwanda, Addis Ababa, Ethiopia 🇪🇹",
    time: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/test-drives", testDriveRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/estimator", estimatorRoutes);
app.use("/api/admin", adminRoutes);

// Fallback 404 for unknown API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
