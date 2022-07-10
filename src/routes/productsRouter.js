import { Router } from "express";
import {validateCategory, validateSubCategory, validateSubCategories, validateObjectId, validateNameProduct} from "../middlewares/validateProducts.js";
import { getProductsNewReleases, getProductsTopRated, getProduct, getCategory, getSubCategory, getCategories, getSubcategories } from "../controllers/productsController.js";

const router = Router();  
router.get('/productsNewReleases', getProductsNewReleases);
router.get('/productsTopRated', getProductsTopRated);
router.get('/products/:category', validateCategory, getCategory);
router.get('/categories', getCategories);
router.get('/products/:category/:subcategory',validateCategory,validateSubCategory,getSubCategory);
router.get('/subcategories', validateSubCategories, getSubcategories)
router.get('/products/:category/:subcategory/:productName', validateCategory,validateSubCategory, validateNameProduct, getProduct);
router.get('/product/:id', validateObjectId, getProduct);
export default router;
