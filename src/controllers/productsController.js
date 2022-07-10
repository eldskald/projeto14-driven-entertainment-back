import { db } from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function getProductsNewReleases(req, res){
    dayjs.locale('pt-br');
    // const user=res.locals.user;
    let limit = parseInt(req.query.limit);
    
    try{
        if(!limit) limit=(await db.products.find({}).toArray()).length;
        const query={};
        const options={
            limit,
            sort:{releaseDate:-1},
        }
        const products= await db.products.find(query,options).toArray();

        // for (const prod of products){
        //     prod.releaseDate
        // }

        return res.status(200).send(products);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }



    // try{
    //     const allProducts = await db.products.find({}).toArray();
    //     if (Object.keys(user).length===0) { 
    //         if(limit && limit<=allProducts.length){
    //             const products= await db.products.aggregate([{ $sample: { size: limit } }]).toArray();
    //             return res.status(200).send(products);
    //         }else{
    //             return res.send(allProducts);
    //         }
    //     }else{
    //         // for a while, that we are not setting user related products, it will be the same code;
            
    //         if(limit && limit<=allProducts.length) {
    //             const products= await db.products.aggregate([{ $sample: { size: limit } }]).toArray();
    //             return res.status(200).send(products);
    //         }else{
    //             return res.send(allProducts);
    //         }
    //     }
        
    // } catch(err) {
    //     console.log(err);
    //     res.sendStatus(500);
    // }
}

export async function getProduct(_req, res) {
    const product=res.locals.product;
    
    try{
        if(_req.params.category===undefined){
            const category=await db.categories.findOne({_id:new ObjectId(product._idCategory)});
            product.category=category.category;
        }else{
            product.category=_req.params.category;
        }
        delete product._idCategory;
        
        
        const subCategoryArray=[];            
        for (const id of product._idSubCategory){
            const subcategory=await db.subcategories.findOne({_id: new ObjectId(id)});
            subCategoryArray.push(subcategory.subcategory);
        }
        product.subcategory=subCategoryArray;
        delete product._idSubCategory 
        
        return res.status(200).send(product);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
};

export async function getCategory(_req, res) {
    const _idCategory=res.locals._idCategory;
    try{
        const products=await db.products.find({_idCategory}).toArray();
        if(products.length===0 || !products) {
            return res.sendStatus(204);
        }
        
        for( const prod of products){
            delete prod._idCategory;
            prod.category=_req.params.category;
            const subCategoryArray=[];            
            for (const sub of prod._idSubCategory){
                const subcategory=await db.subcategories.findOne({_id: new ObjectId(sub)});
                subCategoryArray.push(subcategory.subcategory);
            }
            prod.subcategory=subCategoryArray;
            delete prod._idSubCategory 
        }
        
        return res.status(200).send(products);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getSubCategory(_req, res) {
    const subCategory =res.locals.subCategory;
    const _idCategory=res.locals._idCategory;
    const _id=subCategory._id;
    try{
        const products=await db.products.find(
            {
                _idCategory,
                _idSubCategory:
                    {$elemMatch:
                        { $eq:new ObjectId(_id)
                        }
                    }
            }).toArray();
        if(products.length===0 || !products){
            return res.status(404).send(`${subCategory.subcategory} subcategory doesn't exist in this category!`);
        }

        for( const prod of products){
            delete prod._idCategory;
            prod.category=_req.params.category;
            const subCategoryArray=[];            
            for (const sub of prod._idSubCategory){
                const subcategory=await db.subcategories.findOne({_id: new ObjectId(sub)});
                subCategoryArray.push(subcategory.subcategory);
            }
            prod.subcategory=subCategoryArray;
            delete prod._idSubCategory 
        }

        return res.status(200).send(products);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}
