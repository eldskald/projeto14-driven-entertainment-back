import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js'

const router = Router();
router.use([authRouter,productsRouter]);
export default router;
