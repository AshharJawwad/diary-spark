import mongoose from "mongoose";

let connectionPromise;

export async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required.");
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
  }
  try {
    return await connectionPromise;
  } finally {
    connectionPromise = undefined;
  }
}
