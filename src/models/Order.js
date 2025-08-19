import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    size: String,             // e.g., "10 oz", "22 oz"
    designType: String,       // "plain" | "custom"
    designName: String,       // filename or label
    designFileUrl: String,    // optional CDN/S3 URL
    quantity: Number,
    unitPrice: Number,
    currency: { type: String, default: "CAD" },
    subtotal: Number,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["pending", "paid", "fulfilled", "cancelled"], default: "pending" },
    paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    stripeSessionId: String,
    items: [ItemSchema],
    customer: { name: String, email: String, phone: String },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      province: String,
      postalCode: String,
      country: String,
    },
    totals: {
      itemsTotal: Number,
      tax: Number,
      shipping: Number,
      grandTotal: Number,
      currency: { type: String, default: "CAD" },
    },
    timeline: [
      { type: { type: String }, note: String, at: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);