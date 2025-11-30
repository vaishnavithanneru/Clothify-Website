import express from 'express';
import { createOrder, getOrder } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/:id', getOrder);

export default router;