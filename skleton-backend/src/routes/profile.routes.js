import { Router } from 'express';
import { saveProfile, getProfile } from '../controllers/profile.controller.js';

const router = Router();

router.post('/save-profile', saveProfile);


router.get('/get-profile', getProfile);

export default router;
