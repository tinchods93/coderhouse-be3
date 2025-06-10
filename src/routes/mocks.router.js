import { Router } from 'express';
import mockingController from '../controllers/mocking.controller.js';

const router = Router();

router.get('/mockingpets', mockingController.mockingPets);
router.get('/mockingusers', mockingController.mockingUsers);
router.post('/generateData', mockingController.generateData);

export default router;
