import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { saveAddress ,getAddresses } from "../controllers/address.controller.js";
const router = Router();

router.route('/save-address').post(verifyJWT,saveAddress);
router.route('/get-all-addresses').get(verifyJWT,getAddresses);

export default router;