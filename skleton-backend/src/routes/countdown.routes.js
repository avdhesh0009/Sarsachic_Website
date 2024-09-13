import { Router } from 'express';
import { saveCountdownSettings, getCountdownSettings } from '../controllers/countdown.controller.js';

const router = Router();

router.post('/admin/save-countdown', saveCountdownSettings);

router.get('/api/get-countdown', getCountdownSettings);

export default router;
