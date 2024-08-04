// controllers/shippingAddressController.js
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ShippingAddress from '../models/shippingaddress.model.js';

// Create a new shipping address
export const createShippingAddress = asyncHandler(async (req, res, next) => {
  const { name, mobileNumber, flat, area, city, pin, state, country } = req.body;

  const shippingAddress = new ShippingAddress({
    user: req.user._id,
    name,
    mobileNumber,
    flat,
    area,
    city,
    pin,
    state,
    country
  });

  const createdShippingAddress = await shippingAddress.save();
  res.status(201).json(new ApiResponse(201, createdShippingAddress));
});

// Get all shipping addresses for a user
export const getUserShippingAddresses = asyncHandler(async (req, res, next) => {
  const shippingAddresses = await ShippingAddress.find({ user: req.user._id });

  res.status(200).json(new ApiResponse(200, shippingAddresses));
});

// Get a specific shipping address
export const getShippingAddressById = asyncHandler(async (req, res, next) => {
  const shippingAddress = await ShippingAddress.findById(req.params.id);

  if (!shippingAddress) {
    return next(new ApiError(404, 'Shipping address not found'));
  }

  res.status(200).json(new ApiResponse(200, shippingAddress));
});

// Update a shipping address
export const updateShippingAddress = asyncHandler(async (req, res, next) => {
  const { name, mobileNumber, flat, area, city, pin, state, country } = req.body;
  const shippingAddress = await ShippingAddress.findById(req.params.id);

  if (!shippingAddress) {
    return next(new ApiError(404, 'Shipping address not found'));
  }

  if (shippingAddress.user.toString() !== req.user._id.toString()) {
    return next(new ApiError(401, 'Not authorized to update this address'));
  }

  shippingAddress.name = name || shippingAddress.name;
  shippingAddress.mobileNumber = mobileNumber || shippingAddress.mobileNumber;
  shippingAddress.flat = flat || shippingAddress.flat;
  shippingAddress.area = area || shippingAddress.area;
  shippingAddress.city = city || shippingAddress.city;
  shippingAddress.pin = pin || shippingAddress.pin;
  shippingAddress.state = state || shippingAddress.state;
  shippingAddress.country = country || shippingAddress.country;

  const updatedShippingAddress = await shippingAddress.save();
  res.status(200).json(new ApiResponse(200, updatedShippingAddress));
});

// Delete a shipping address
export const deleteShippingAddress = asyncHandler(async (req, res, next) => {
  const shippingAddress = await ShippingAddress.findById(req.params.id);

  if (!shippingAddress) {
    return next(new ApiError(404, 'Shipping address not found'));
  }

  if (shippingAddress.user.toString() !== req.user._id.toString()) {
    return next(new ApiError(401, 'Not authorized to delete this address'));
  }

  await shippingAddress.remove();
  res.status(200).json(new ApiResponse(200, { message: 'Shipping address deleted' }));
});
