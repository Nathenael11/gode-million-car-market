import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import testDriveRoutes from "./routes/testDriveRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import estimatorRoutes from "./routes/estimatorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { serveUploads } from "./config/uploads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIST = path.resolve(__dirname, "../../client/dist");

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Increased limit for base64 image uploads from camera/local disk
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Gode and Million Car Market API",
    location: "Bole Rwanda, Addis Ababa, Ethiopia",
    time: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/test-drives", testDriveRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/estimator", estimatorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
serveUploads(app);

app.all("/api/*", (req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get("*", (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

app.use(errorHandler);

export default app;
