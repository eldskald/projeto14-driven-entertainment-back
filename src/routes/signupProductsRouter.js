import { Router } from "express";
import { signupPoducts } from "../controllers/signupProductsController.js";
import { productValidation } from "../middlewares/signupProductsValidation.js";

const productRouter = Router();

productRouter.post("/signup-products", productValidation, signupPoducts);

export default productRouter;
