import { db } from "../db.js";

export async function getProducts( req, res, next ){
    const user=res.locals.user;
    const limit=res.locals.limit;
    
    try{
        const allProducts = await db.products.find({}).toArray();
        if (Object.keys(user).length===0) { 
            if(limit && limit<=allProducts.length){
                const products= await db.products.aggregate([{ $sample: { size: limit } }]).toArray();
                return res.status(200).send(products);
            }else{
                return res.send(allProducts);
            }
        }else{
            // for a while, that we are not setting user related products, it will be the same code;
            
            if(limit && limit<=allProducts.length){
                const products= await db.products.aggregate([{ $sample: { size: limit } }]).toArray();
                return res.status(200).send(products);
            }else{
                return res.send(allProducts);
            }
        }
        
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
   
}