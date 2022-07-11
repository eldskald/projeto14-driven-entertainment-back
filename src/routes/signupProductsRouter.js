import { Router } from "express";
import { signupPoducts, createCategory, createSubcategory } from "../controllers/signupProductsController.js";
import { productValidation, verifyCategory, verifySubCategory } from "../middlewares/signupProductsValidation.js";

const signupProductRouter = Router();
signupProductRouter.post("/signup-products", productValidation, verifyCategory, verifySubCategory, signupPoducts);
signupProductRouter.post("/new-category", createCategory);
signupProductRouter.post("/new-subcategory", createSubcategory);
export default signupProductRouter;
