import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  sizeOz: { type: Number, required: true },
  qtyCase: { type: Number, default: 1000 },
  pricePerCupPlain: { type: Number },
  pricePerCupCustom: { type: Number },
  priceCase: { type: Number },
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: "cups" },
  description: { type: String },
  imageUrl: { type: String },
  isCustomizable: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  variants: { type: [VariantSchema], default: [] },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);