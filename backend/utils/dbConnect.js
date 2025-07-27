import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = global.mongoose || {};

if (!cached.conn) {
  cached.conn = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global.mongoose = cached;
}

/**
 * Connects to MongoDB (singleton for hot-reload/dev)
 */
export default async function dbConnect() {
  await cached.conn;
}
