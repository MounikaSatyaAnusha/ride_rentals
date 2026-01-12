import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function connectDB() {
  try {
    if (!MONGODB_URI) {
      console.log("MongoDB URI not configured");
      return false;
    }
    if (!MONGODB_URI.includes("mongodb")) {
      console.log("Invalid MongoDB URI format");
      return false;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed. Application will use in-memory storage.");
    console.error("Error:", error instanceof Error ? error.message : error);
    return false;
  }
}

export default mongoose;
