import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import cartValidation from "../middlewares/cartValidation.js";
import { getProducts, getProduct, updateCart} from "../controllers/productsController.js";

const router=Router();  
router.get('/products',tokenValidation, getProducts);
router.get('/product/:id', validateObjectId, getProduct);
router.put('/cart', tokenValidation, cartValidation, updateCart);
export default router;
