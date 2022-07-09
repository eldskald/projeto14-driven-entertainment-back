import { db } from "../db.js";

export async function getProducts(req, res){
    const user=res.locals.user;
    const limit = parseInt(req.query.limit);
    
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
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateCart(_req, res) {
    try {
        const user = res.locals.user;
        if (Object.keys(user).length === 0) {
            return res.sendStatus(200);
        }

        const cart = res.locals.cart;
        await db.users.updateOne(
            {
                _id: user._id
            },
            { $set: {
                ...user,
                cart
            }}
        );

        return res.sendStatus(200);

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getProduct(req, res){
    const product=res.locals.product;
    try{
        return res.status(200).send(product);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
};

// export async function getCategory(req,res){
//     const category=res.locals.category;

// }