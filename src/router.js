import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js';
import userRouter from './routes/userRouter.js';
import signupProductRouter from './routes/signupProductsRouter.js';

const router = Router();
router.use(authRouter);
router.use(productsRouter);
router.use(userRouter);
router.use(signupProductRouter);
export default router;
