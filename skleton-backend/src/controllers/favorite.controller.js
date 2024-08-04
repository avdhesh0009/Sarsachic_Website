import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import ApuProduct from '../models/apuproduct.model.js';
import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

// Add a product to user's favorites
const addToFavorites = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json(new ApiError(404, {}, 'User not found'));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json(new ApiError(404, {} ,'Product not found'));
  }

  // Check if the product is already in favorites
  const isAlreadyFavorite = user.favorites.some(favorite => String(favorite.product) === productId);
  if (isAlreadyFavorite) {
    return res.status(400).json(new ApiError(400, {}, 'Product already in favorites'));
  }

  user.favorites.push({ product: productId });
  await user.save();

  res.status(200).json(new ApiResponse(200, 'Successfully added to favorites', user.favorites));
});

// Remove a product from user's favorites
const removeFromFavorites = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  // console.log(productId);
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, 'User not found'));
  }

  // Remove the product from favorites
  user.favorites = user.favorites.filter(item => item.product.toString() !== productId);
  await user.save();

  res.status(200).json(new ApiResponse(200, 'Successfully removed from favorites', user.favorites));
});

// Get user's favorites list
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites.product');

  if (!user) {
    return res.status(404).json(new ApiResponse(404, 'User not found'));
  }

  res.status(200).json(new ApiResponse(200, 'Fetched favorites successfully', user.favorites));
});

export { addToFavorites, removeFromFavorites, getFavorites };
