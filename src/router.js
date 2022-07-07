
import { Router } from "express";
import authRouter from "./routes/authRouter.js";
import signupProductRouter from "./routes/signupProductsRouter.js";

const router = Router();
router.use(authRouter);
router.use(productRouter);

import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js'

const router = Router();
router.use([authRouter,productsRouter]);

export default router;
