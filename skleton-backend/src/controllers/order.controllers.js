// import Product from '../models/Product.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ShippingAddress from '../models/shippingaddress.model.js';
import Order from '../models/order.model.js';

// Create a new order
export const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddressId, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ApiError(400, 'No order items'));
  }

  const shippingAddress = await ShippingAddress.findById(shippingAddressId);
  if (!shippingAddress) {
    return next(new ApiError(404, 'Shipping address not found'));
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress: shippingAddressId,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(new ApiResponse(201, createdOrder));
});

// Get order by ID
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('shippingAddress').populate('orderItems.product');

  if (!order) {
    return next(new ApiError(404, 'Order not found'));
  }

  res.status(200).json(new ApiResponse(200, order));
});

// Get logged in user orders
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product').populate('shippingAddress');

  res.status(200).json(new ApiResponse(200, orders));
});

// Get all orders (admin only)
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'name email').populate('orderItems.product').populate('shippingAddress');

  res.status(200).json(new ApiResponse(200, orders));
});

// Update order to paid
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ApiError(404, 'Order not found'));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address
  };

  const updatedOrder = await order.save();
  res.status(200).json(new ApiResponse(200, updatedOrder));
});

// Update order to delivered (admin only)
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ApiError(404, 'Order not found'));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.status(200).json(new ApiResponse(200, updatedOrder));
});
