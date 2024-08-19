import express from "express";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createReview,
  getProductWithReviews,
  getMensProducts
} from "../controllers/product.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/get-reviews/:id',getProductWithReviews);

router.post("/add", addProduct);
router.get('/:category-products',getMensProducts);
router.get('/getAllProducts', getAllProducts); // List all products
router.get('/:id', getProductById); // Get a single product by ID
router.put('/:id', updateProduct); // Update product by ID
router.delete('/:id', deleteProduct); // Delete product by ID

router.post('/add-reviews/:userId',verifyJWT,createReview);

export default router;

