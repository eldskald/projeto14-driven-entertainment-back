import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import {validateCategory, validateSubCategory, validateObjectId, validateNameProduct} from "../middlewares/validateProducts.js";
import { getProductsNewReleases, getProduct, getCategory, getSubCategory } from "../controllers/productsController.js";

const router = Router();  
router.get('/productsNewReleases',tokenValidation, getProductsNewReleases);
router.get('/products/:category', validateCategory, getCategory);
router.get('/products/:category/:subcategory',validateCategory,validateSubCategory,getSubCategory);
router.get('/products/:category/:subcategory/:productName', validateCategory,validateSubCategory, validateNameProduct, getProduct);
router.get('/product/:id', validateObjectId, getProduct);
export default router;
