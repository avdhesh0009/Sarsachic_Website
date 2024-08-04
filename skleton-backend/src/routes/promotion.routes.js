import { Router } from "express";
import { joinUs } from "../controllers/promotion.controller.js";

const router = Router();

router.route('/join-us').post(joinUs);

export default router