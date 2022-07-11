import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation.js';
import cartValidation from '../middlewares/cartValidation.js';
import { getLibrary, updateCart, checkout } from '../controllers/userController.js';

const router = Router();
router.get('/library', tokenValidation, getLibrary);
router.put('/cart', tokenValidation, cartValidation, updateCart);
router.put('/checkout', tokenValidation, checkout);
export default router;
