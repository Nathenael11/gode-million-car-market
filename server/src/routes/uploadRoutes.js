import express from "express";
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

    const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: "Invalid base64 image format." });
    }

    const ext = matches[1];
    const data = matches[2];
    const safeName = (filename || ("car_" + Date.now()))
      .replace(/[^a-z0-9_.-]/gi, "_")
      .replace(/\.+$/, "") + "_" + Date.now() + "." + ext;

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
