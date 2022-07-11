import { Router } from "express";
import {validateCategory, validateSubCategory, validateSubCategories, validateObjectId, validateNameProduct} from "../middlewares/validateProducts.js";
import { getProductsNewReleases, getProductsTopRated, getProduct, getCategoryNewReleases, getCategoryTopRated, getSubCategoryNewReleases, getSubCategoryTopRated, getCategories, getSubcategories } from "../controllers/productsController.js";

const router = Router();  
router.get('/productsNewReleases', getProductsNewReleases);
router.get('/productsTopRated', getProductsTopRated);
router.get('/categories', getCategories);

router.get('/productsNewReleases/:category', validateCategory, getCategoryNewReleases);
router.get('/productsTopRated/:category', validateCategory, getCategoryTopRated);

router.get('/productsNewReleases/:category/:subcategory',validateCategory,validateSubCategory,getSubCategoryNewReleases);
router.get('/productsTopRated/:category/:subcategory',validateCategory,validateSubCategory,getSubCategoryTopRated);

router.get('/subcategories', validateSubCategories, getSubcategories)


router.get('/products/:category/:subcategory/:productName', validateCategory,validateSubCategory, validateNameProduct, getProduct);
router.get('/product/:id', validateObjectId, getProduct);
export default router;
