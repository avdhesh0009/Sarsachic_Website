import ApuProduct from "../models/apuproduct.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await ApuProduct.find({});
  res.status(200).json(new ApiResponse(200, products));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await ApuProduct.findById(req.params.id);

  console.log(product);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, product));
});


const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    subcategory,
    price,
    stockQuantity,
    sizes,
    colors,
    featuredProduct,
    oversizedTshirt
  } = req.body;


  console.log(req.body);

  const imageFiles = req.files;

  return

  let imageUrls = [];
  if (imageFiles && imageFiles.length > 0) {
    for (let file of imageFiles) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        imageUrls.push(result.url);
      }
    }
  }

  const product = new ApuProduct({
    name,
    description,
    category,
    subcategory,
    price,
    stockQuantity,
    sizes,
    colors,
    images: imageUrls,
    featuredProduct,
    oversizedTshirt
  });

  const createdProduct = await product.save();
  res.status(201).json(new ApiResponse(201, createdProduct));
});


const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    subcategory,
    price,
    stockQuantity,
    sizes,
    colors,
    featuredProduct,
    oversizedTshirt
  } = req.body;

  const imageFiles = req.files;

  const product = await ApuProduct.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  let imageUrls = product.images;
  if (imageFiles && imageFiles.length > 0) {
    for (let file of imageFiles) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        imageUrls.push(result.url);
      }
    }
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.category = category || product.category;
  product.subcategory = subcategory || product.subcategory;
  product.price = price || product.price;
  product.stockQuantity = stockQuantity || product.stockQuantity;
  product.sizes = sizes || product.sizes;
  product.colors = colors || product.colors;
  product.images = imageUrls;
  product.featuredProduct = featuredProduct || product.featuredProduct;
  product.oversizedTshirt = oversizedTshirt || product.oversizedTshirt;

  const updatedProduct = await product.save();
  res.status(200).json(new ApiResponse(200, updatedProduct));
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ApuProduct.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.remove();
  res.status(200).json(new ApiResponse(200, 'Product removed'));
});


const getFeaturedProducts = async (req, res) => {
    try {
      const featuredProducts = await ApuProduct.find().sort({createdAt: -1}).limit(6);
      console.log(featuredProducts);
      res.json(featuredProducts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export { getProducts,getFeaturedProducts, getProductById, createProduct, updateProduct, deleteProduct };
