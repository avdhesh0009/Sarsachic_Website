import express from "express";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", addProduct);
router.get('/getAllProducts', getAllProducts); // List all products
router.get('/:id', getProductById); // Get a single product by ID
router.put('/:id', updateProduct); // Update product by ID
router.delete('/:id', deleteProduct); // Delete product by ID

export default router;

