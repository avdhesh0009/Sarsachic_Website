import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size } = req.body;
  
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
  const { productId, sizeId } = req.body;

  // Find the user
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  // Update the cart by removing the specific size of the product
  user.cart = user.cart.map(item => {
    if (item.product._id.toString() === productId) {
      // Filter out the size that matches the given sizeId
      item.sizes = item.sizes.filter(size => size._id.toString() !== sizeId);

      // If no sizes are left, remove the product from the cart
      if (item.sizes.length === 0) {
        return null; // Mark this item for removal
      }
    }
    return item;
  }).filter(item => item !== null); // Filter out null values (products with no sizes left)

  // Save the updated user document
  await user.save();

  // Send the updated cart in the response
  res.status(200).json(new ApiResponse(200, user.cart));
});

const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.status(200).json(new ApiResponse(200, user.cart));
});

const updateCart = asyncHandler(async(req,res)=>{
  const { productId, sizeId , quantity } = req.body;

   const user = await User.findById(req.user._id).populate("cart.product");
   if(!user){
      return res.status(404).json({ message: "User not found" });
   }

   const cartItem = user.cart.find(item => item.product._id.toString() === productId);
   if (!cartItem) {
       return res.status(404).json({ message: "Product not found in cart" });
   }

   const sizeToUpdate = cartItem.sizes.find(size => size._id.toString() === sizeId);
   if (!sizeToUpdate) {
       return res.status(404).json({ message: "Size not found in cart" });
   }

   sizeToUpdate.quantity = quantity;

   await user.save();

   res.status(200).json({ message: "Cart item size quantity updated to 0", cart: user.cart });
})

export { addToCart, removeFromCart, getCart,updateCart };
