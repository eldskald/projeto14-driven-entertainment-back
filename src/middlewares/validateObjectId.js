import { db } from "../db.js";
import { ObjectId } from "mongodb";

export default async function validateObjectId(req,res,next){
    const _id=req.params.id;

    if(ObjectId.isValid(_id)){
        if((String)(new ObjectId(_id)) === _id){
            const product = await db.products.findOne({_id: ObjectId(_id) });
            if(!product){
                return res.status(400).send('There is no product with this id!');
            }
            res.locals.product=product;
            return next();          
        }
        return res.status(422).send('The parameter must be a valid _id/ObjectId!');
    }
    return res.status(422).send('The parameter must be a valid _id/ObjectId!');
}