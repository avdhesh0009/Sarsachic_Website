import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  style: { type: String },
  fabric: { type: String },
  fit: { type: String },
  sleeveLength: { type: String },
  ageGroup: { type: String },
  gender: { type: String },
  design: { type: String },
  oginialPrice:{ type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  sizes: { type: String },
  colors: { type: String },
  images: [{ type: String, required: true }],
  featured: { type: Boolean, default: false },
  oversized: { type: Boolean, default: false },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Reviews"
  }]
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
