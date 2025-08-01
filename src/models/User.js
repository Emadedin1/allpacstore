import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:  { type: String, required: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in dev/hot-reload:
export default mongoose.models.User || mongoose.model("User", UserSchema);
