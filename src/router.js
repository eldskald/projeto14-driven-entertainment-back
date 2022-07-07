import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js'
import signupProductRouter from "./routes/signupProductsRouter.js";

const router = Router();
router.use(signupProductRouter);
router.use([authRouter,productsRouter]);

export default router;
