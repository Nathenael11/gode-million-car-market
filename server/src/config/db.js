import { memoryStore } from "../utils/memoryStore.js";

export const connectDB = async () => {
  console.log("💾 Database Engine: Embedded Zero-Config Persistent JSON Store");
  console.log(`📦 Loaded: ${memoryStore.cars.length} cars, ${memoryStore.users.length} users, ${memoryStore.blogs.length} articles`);
  console.log("🚀 Ready for instant 1-click deployment (No external database connection needed)");
  return true;
};
