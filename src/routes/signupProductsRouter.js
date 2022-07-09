import { Router } from "express";
import { signupPoducts } from "../controllers/signupProductsController.js";
import { productValidation, verifyCategory, verifySubCategory } from "../middlewares/signupProductsValidation.js";

const signupProductRouter = Router();

signupProductRouter.post("/signup-products", productValidation, verifyCategory, verifySubCategory, signupPoducts);

export default signupProductRouter;
