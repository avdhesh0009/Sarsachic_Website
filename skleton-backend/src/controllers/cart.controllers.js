import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';


const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size } = req.body;
  console.log(size);
  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }
  const user = await User.findById(req.user._id);

  if (!user || !Array.isArray(user.cart)) {
    return res.status(404).json({ message: 'User or user cart not found' });
  }

  const cartItem = user.cart.find(item => item.product && String(item.product) === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
    const sizeObj = cartItem.sizes.find(s => s.size === size);
    if (sizeObj) {
      sizeObj.quantity += 1;
    } else {
      cartItem.sizes.push({ size: size, quantity: 1 });
    }
  }
  else {
    // user.cart.push({ product: productId, quantity, sizes: { [size]: 1 } });
    user.cart.push({
      product:productId,
      quantity,
      sizes: [{ size: size, quantity: 1 }]
    });
  }
  await user.save();
  res.status(200).json(new ApiResponse(200, user.cart));
});


const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(item => String(item.product) !== productId);
  await user.save();
  res.status(200).json(new ApiResponse(200, user.cart));
});


const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.status(200).json(new ApiResponse(200, user.cart));
});

export { addToCart, removeFromCart, getCart };
