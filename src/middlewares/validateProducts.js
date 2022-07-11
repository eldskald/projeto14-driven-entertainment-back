import { db } from "../db.js";
import { ObjectId } from "mongodb";

export async function validateObjectId(req,res,next){
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

export async function validateNameProduct(req,res,next){
    const name=req.params.productName;
    const _idCategory=res.locals._idCategory;
    const subCategory=res.locals.subCategory;

        const product = await db.products.findOne({_idCategory, name, _idSubCategory:subCategory._id});
            if(!product){
                return res.status(400).send('There is no product with this id!');
            }
        res.locals.product=product;
        return next();          
}

export async function validateCategory(req,res,next){
    const category=req.params.category;
    
    if(category!== 'Movie' && category!=='Video Game'){
        return res.status(404).send(`${category} category doesn't exist! Try 'Movie' or 'Video Game'`);
    }

    const categoryExist=await db.categories.findOne({category});
    
    if(!categoryExist){
        return res.status(204).send(`${category} category is empty!`);
    }
    
    res.locals._idCategory=categoryExist._id;
    console.log('id da categoria no local: ', res.locals._idCategory);
    return next();
}

export async function validateSubCategory(req,res,next){
    const subcategory=req.params.subcategory;
    const _idCategory=res.locals._idCategory;
    console.log('id da categoria que chega pelo locals: ', _idCategory);
    console.log('nome da subcategoria que chega pelo params', subcategory);

    const subCategoryExist= await db.subcategories.findOne({subcategory, _idCategory});
    

    if(!subCategoryExist){
        return res.status(404).send(`${subcategory} subcategory doesn't exist in this category!`)
    }

    res.locals.subCategory=subCategoryExist;
    return next();
}

export async function validateSubCategories(req,res,next){
    const {category}=req.headers;
    if (!category) {
        return res.status(422).send('Missing headers!');
    }
    const categoryExist= await db.categories.findOne({category});
    if(!categoryExist) return res.status(404).send(`${category} category doesn't exist!`);

    res.locals._idCategory=categoryExist._id;
    return next();
}
