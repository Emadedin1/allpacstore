import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      // add more item fields if needed
    },
  ],
  total: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // add any other fields you need
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
