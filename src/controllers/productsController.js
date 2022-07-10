import { db } from "../db.js";
import { ObjectId } from "mongodb";

async function getNameMonth(string){
    switch (string) {
        case '01':
            return 'Jan';
        case '02':
            return 'Feb';     
        case '03':
            return 'Mar';     
        case '04':
            return 'Apr';
        case '05':
            return'May';
        case '06':
            return 'Jun';
        case '07':
            return 'Jul';
        case '08':
            return'Aug';
        case '09':
            return 'Sep';
        case '10':
            return'Oct';
        case '11':
            return 'Nov';
        case '12':
            return 'Dec';
        default:
            console.log(`error on date`);
    }
}

export async function getProductsNewReleases(req, res){
    let limit = parseInt(req.query.limit);
    
    try{
        if(!limit) limit=(await db.products.find({}).toArray()).length;
        const query={};
        const options={
            limit,
            sort:{releaseDate:-1},
        }
        const products= await db.products.find(query,options).toArray();

        for (const prod of products){
            const dateArray=prod.releaseDate.split('/');
            const month= await getNameMonth(dateArray[1]);
            prod.releaseDate=`${month} ${dateArray[2]}, ${dateArray[0]}`;
            const category=await db.categories.findOne({_id:new ObjectId(prod._idCategory)});
            prod.category=category.category;
            delete prod._idCategory;
            const subCategoryArray=[];            
            for (const id of prod._idSubCategory){
                const subcategory=await db.subcategories.findOne({_id: new ObjectId(id)});
                subCategoryArray.push(subcategory.subcategory);
            }
            prod.subcategory=subCategoryArray;
            delete prod._idSubCategory 
        }

        return res.status(200).send(products);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function getProductsTopRated(req, res){
    let limit = parseInt(req.query.limit);
    
    try{
        if(!limit) limit=(await db.products.find({}).toArray()).length;
        const query={};
        const options={
            limit,
            sort:{rating:-1},
        }
        const products= await db.products.find(query,options).toArray();

        for (const prod of products){
            const dateArray=prod.releaseDate.split('/');
            const month= await getNameMonth(dateArray[1]);
            prod.releaseDate=`${month} ${dateArray[2]}, ${dateArray[0]}`;
            const category=await db.categories.findOne({_id:new ObjectId(prod._idCategory)});
            prod.category=category.category;
            delete prod._idCategory;
            const subCategoryArray=[];            
            for (const id of prod._idSubCategory){
                const subcategory=await db.subcategories.findOne({_id: new ObjectId(id)});
                subCategoryArray.push(subcategory.subcategory);
            }
            prod.subcategory=subCategoryArray;
            delete prod._idSubCategory 
        }

        return res.status(200).send(products);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function getProduct(req, res) {
    const product=res.locals.product;
    
    try{
        if(req.params.category===undefined){
            const category=await db.categories.findOne({_id:new ObjectId(product._idCategory)});
            product.category=category.category;
        }else{
            product.category=req.params.category;
        }
        const dateArray=product.releaseDate.split('/');
        const month= await getNameMonth(dateArray[1]);
        product.releaseDate=`${month} ${dateArray[2]}, ${dateArray[0]}`;
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

export async function getCategory(req, res) {
    const _idCategory=res.locals._idCategory;
    try{
        const products=await db.products.find({_idCategory}).toArray();
        if(products.length===0 || !products) {
            return res.sendStatus(204);
        }
        
        for( const prod of products){
            delete prod._idCategory;
            prod.category=req.params.category;
            const dateArray=prod.releaseDate.split('/');
            const month= await getNameMonth(dateArray[1]);
            prod.releaseDate=`${month} ${dateArray[2]}, ${dateArray[0]}`;
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

export async function getCategories(_,res){
    try{
        const categoriesArray= await db.categories.find({}).toArray();
        const categoriesName=[];
        for (const category of categoriesArray){
            categoriesName.push(category.category);
        }
        return res.status(200).send(categoriesName);
    }catch(error){
        console.error(error);
        return res.status(500).send(error);
    };
};

export async function getSubCategory(req, res) {
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
            prod.category=req.params.category;
            const dateArray=prod.releaseDate.split('/');
            const month= await getNameMonth(dateArray[1]);
            prod.releaseDate=`${month} ${dateArray[2]}, ${dateArray[0]}`;
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

export async function getSubcategories(_,res){
    const _idCategory=res.locals._idCategory
    try{
        const subcategoriesArray= await db.subcategories.find({_idCategory}).toArray();
        const subcategoriesName=[];
        for (const subcategory of subcategoriesArray){
            subcategoriesName.push(subcategory.subcategory);
        }
        return res.status(200).send(subcategoriesName);
    }catch(error){
        console.error(error);
        return res.status(500).send(error);
    };
}
