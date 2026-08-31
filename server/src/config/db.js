import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('example') || uri.includes('user:pass')) {
    console.log('ℹ️ Running with robust In-Memory Store & Seed Data (MongoDB URI not set).');
    return false;
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection skipped (${error.message}). Continuing in In-Memory High-Performance Mode.`);
    return false;
  }
};
