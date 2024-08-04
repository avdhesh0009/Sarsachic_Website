import { Router } from "express";

import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { saveHomeData, saveThemeData } from "../controllers/customization.controller.js";
import { manageUsers,deleteSingleUser } from "../controllers/admin.controller.js";


const router = Router()

router.route('/save-home-banner').post(upload.single("home-banner"), saveHomeData)
router.route('/save-theme-data').post(upload.single("theme-banner"), saveThemeData)

router.route('/manage-users').get(manageUsers);
router.route('/delete-single-user').post(deleteSingleUser);
// router.route("/history").get(verifyJWT, getWatchHistory)

export default router