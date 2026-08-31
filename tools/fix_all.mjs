import fs from 'fs';
import path from 'path';

const W = (p, c) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c, 'utf8');
  console.log('Wrote:', p.replace(process.cwd() + path.sep, ''));
};

const BASE = path.resolve('.');
const S = (p) => path.join(BASE, p);

// ── 1. server.js (fix emoji) ─────────────────────────────────────────────────
W(S('server/server.js'), `import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, HOST, () => {
    console.log("Gode & Million Car Market Server running on http://" + HOST + ":" + PORT);
    console.log("Location: Bole Rwanda, Addis Ababa, Ethiopia");
    console.log("Health endpoint: http://localhost:" + PORT + "/api/health");
  });
};

startServer();
`);

// ── 2. server/src/app.js (fix corrupted chars) ───────────────────────────────
W(S('server/src/app.js'), `import express from "express";
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
`);

// ── 3. Upload route (base64 images from camera/file) ─────────────────────────
W(S('server/src/routes/uploadRoutes.js'), `import express from "express";
const router = express.Router();

/**
 * POST /api/upload/image
 * Accepts { base64: "data:image/jpeg;base64,...", filename: "car.jpg" }
 * Saves to server/public/uploads and returns a permanent URL.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, "../../public/uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

router.post("/image", (req, res) => {
  try {
    const { base64, filename } = req.body;

    if (!base64) {
      return res.status(400).json({ success: false, message: "No image data provided." });
    }

    const matches = base64.match(/^data:image\\/(\\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: "Invalid base64 image format." });
    }

    const ext = matches[1];
    const data = matches[2];
    const safeName = (filename || ("car_" + Date.now()))
      .replace(/[^a-z0-9_.-]/gi, "_")
      .replace(/\\.+$/, "") + "_" + Date.now() + "." + ext;

    const filePath = path.join(UPLOAD_DIR, safeName);
    fs.writeFileSync(filePath, Buffer.from(data, "base64"));

    res.json({
      success: true,
      url: "/uploads/" + safeName,
      message: "Image uploaded successfully."
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
`);

// Serve uploads as static
W(S('server/src/config/uploads.js'), `import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, "../../public/uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const serveUploads = (app) => {
  app.use("/uploads", express.static(UPLOAD_DIR));
};
`);

// ── 4. Root package.json (clean, no corrupted chars) ─────────────────────────
W(S('package.json'), JSON.stringify({
  name: "gode-million-car-market",
  version: "1.0.0",
  description: "Gode and Million Car Market - Premier Automotive Marketplace in Bole Rwanda, Addis Ababa, Ethiopia",
  scripts: {
    "install:all": "npm --prefix server install && npm --prefix client install",
    "dev:server": "npm --prefix server run dev",
    "dev:client": "npm --prefix client run dev",
    "build": "npm --prefix client run build",
    "start": "npm --prefix server start"
  },
  keywords: ["ethiopia", "car-market", "addis-ababa", "bole-rwanda", "amharic", "react", "express"],
  author: "Gode & Million Automotive Ethiopia",
  license: "MIT"
}, null, 2));

// ── 5. README.md (clean) ─────────────────────────────────────────────────────
W(S('README.md'), `# Gode and Million Car Market
### Ethiopian Automotive Marketplace — Bole Rwanda, Addis Ababa

A bilingual **Amharic (Ethiopic) / English** full-stack car marketplace web application for **Gode and Million Car Market** (Bole Rwanda, Addis Ababa, Ethiopia).

---

## Features

- **Zero-Config Database** — Built-in persistent JSON store, no MongoDB or PostgreSQL setup needed
- **Camera & Local Photo Upload** — Add vehicle photos directly from device camera or local disk
- **Bilingual** — Switch between English and Amharic (Ethiopic script) instantly
- **Professional Design** — Warm tangerine (#FF8C00) primary color, executive slate + pearl white palette
- **Ethiopian Market Context** — ETB pricing, Telebirr/CBE Birr, plate codes, EV duty-free incentives
- **Tools** — Price estimator, financing calculator, compare drawer, test drive booking, QR code share
- **Role-Based Accounts** — Buyer, Seller, Admin dashboards

---

## Quick Start

\`\`\`bash
# Server (port 5000)
cd server && npm install && npm start

# Client dev (port 5173)
cd client && npm install && npm run dev
\`\`\`

Open: http://localhost:5173

---

## Demo Accounts

| Role   | Email                      | Password    |
|--------|----------------------------|-------------|
| Admin  | admin@godemillion.et       | Admin@123   |
| Seller | seller@godemillion.et      | Seller@123  |
| Buyer  | buyer@godemillion.et       | Buyer@123   |

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4
- **Backend**: Node.js 20 + Express 5
- **Database**: Zero-config persistent JSON (embedded, no setup)
- **Auth**: JWT tokens + bcrypt
- **Images**: Local disk upload (base64) + Unsplash CDN fallback

---

Built for Bole Rwanda, Addis Ababa, Ethiopia.
`);

console.log('\nDone with server-side fixes.');
