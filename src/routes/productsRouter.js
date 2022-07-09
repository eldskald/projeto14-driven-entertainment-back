import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import {validateCategory, validateSubCategory, validateObjectId} from "../middlewares/validateProducts.js";
import { getProducts, getProduct, getCategory, getSubCategory } from "../controllers/productsController.js";

const router = Router();  
router.get('/products',tokenValidation, getProducts);
router.get('/:category', validateCategory, getCategory);
router.get('/:category/:subcategory',validateCategory,validateSubCategory,getSubCategory);
router.get('/product/:id', validateObjectId, getProduct);
export default router;
