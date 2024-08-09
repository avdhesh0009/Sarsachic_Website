import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
  verifyUser,
  googleAuth,
  changePassword,
  saveProfileImage,
  getProfileImage
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getShopData,
  getWebData,
} from "../controllers/customization.controller.js";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";
import { createProduct, deleteProduct, getFeaturedProducts, getProductById, getProducts, updateProduct } from "../controllers/apu_product_controller.js";
import { addToFavorites ,getFavorites,removeFromFavorites} from "../controllers/favorite.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/auth/google").post(googleAuth);

router.route("/verify/:userId/:uniqueString").get(verifyUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:userId/:token").get(resetPasswordGet);

router.route("/reset-password/:userId/:token").post(resetPasswordPost);

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/update-password").post(verifyJWT,  changePassword)



// routes from apu
router.route("/get-web-data").get(getWebData);

router.route("/shop-data/:shop").get(getShopData);

router.route("/").post(verifyJWT,addToCart).get(verifyJWT, getCart);

router.route("/:productId").delete(verifyJWT, removeFromCart);



router.route('/add-product').post(createProduct )
router.route('/update-product/:id').put(updateProduct )
router.route('/delete-product/:id').delete(deleteProduct )
router.route('/get-products').get(getProducts )
router.route('/get-product/:id').get(getProductById )

router.route('/featured-products').get(getFeaturedProducts )



// routes from apu
router.route('/get-web-data').get(getWebData)


router.route('/add-cart').post(verifyJWT, addToCart )
router.route('/get-cart').get(verifyJWT, getCart )


router.route('/add-favorite').post(verifyJWT, addToFavorites )
router.route('/get-favorites').get(verifyJWT,getFavorites)
router.route('/remove-from-favorites/:productId').get(verifyJWT,removeFromFavorites)


router.route('/upload-profile-image/:userId').post(verifyJWT,upload.single("profile-image"),saveProfileImage)
router.route('/image-url/:userId').get(verifyJWT,getProfileImage)

export default router;
