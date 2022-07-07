import { Router } from "express";
import { signupPoducts } from "../controllers/signupProductsController.js";
import { productValidation } from "../middlewares/signupProductsValidation.js";

const signupProductRouter = Router();

signupProductRouter.post("/signup-products", productValidation, signupPoducts);

export default signupProductRouter;
