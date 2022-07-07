import { Router } from "express";
import authRouter from "./routes/authRouter.js";
import signupProductRouter from "./routes/signupProductsRouter.js";

const router = Router();
router.use(authRouter);
router.use(signupProductRouter);
export default router;
