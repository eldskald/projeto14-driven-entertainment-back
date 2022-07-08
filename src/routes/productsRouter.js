import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getProducts, getProduct} from "../controllers/productsController.js";
import validateObjectId from "../middlewares/validateObjectId.js";

    const router=Router();  
    router.get('/products',tokenValidation, getProducts);
    router.get('/product/:id', validateObjectId, getProduct);

export default router;
