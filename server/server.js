import dotenv from "dotenv";
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
