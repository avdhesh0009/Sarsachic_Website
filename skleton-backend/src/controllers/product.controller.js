import Product from "../models/Product.js";
import { Reviews } from "../models/review.model.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

// save reviews
export const createReview = asyncHandler(async (req,res) => {
    const {productId,reviewData} = req.body;
    const {userId} =req.params;
    const {imageUrl} = await User.findOne({_id:userId});
    if(!imageUrl){
      imageUrl=""
    }
    const review = new Reviews({ ...reviewData, product: productId,imageUrl});
    await review.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id }
    });

    if(!review){
      throw new ApiError(400,"Unable to save the reviews");
    }

    res.status(200).json(
      new ApiResponse(200,"Review save successfully")
    )
})

// get reviews
export const getProductWithReviews = asyncHandler(async (req, res) => {
  const {id:productId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, error: "Invalid product ID" });
  }
  const product = await Product.findById(productId).populate('reviews');
  if (!product) {
      throw new ApiError(400, "Error while fetching the reviews data");
  }
  res.status(200).json(
      new ApiResponse(200,product,"Reviews fetched successfully")
  );
});


// Add product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from database
    res.status(200).json(products); // Return products array
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Fetch a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

