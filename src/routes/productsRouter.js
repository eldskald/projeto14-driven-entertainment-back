import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getProducts} from "../controllers/productsController.js";

    const router=Router();  
    router.get('/products',tokenValidation, getProducts);

export default router;
