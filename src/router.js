import { Router } from "express";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/signupProductsRouter.js";

const router = Router();
router.use(authRouter);
router.use(productRouter);
export default router;
