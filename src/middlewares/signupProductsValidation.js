import joi from "joi";
import { db } from "../db.js";

// const signupPoductsSchema = joi.object({
//   name: joi.string().required(),
//   price: joi.number().required(),
//   description: joi.string(),
//   rating: joi.number().required(),
//   image: joi.string().required(),
//   category: joi.string().required(),
//   subcategory: joi.array().required(),
//   producer: joi.string().required(),
//   releaseDate: joi.string().required(),
// });

const productNameSchema = joi.object({
  name: joi.string().required(),
});
const productPriceSchema = joi.object({
  price: joi.number().required(),
});

const productDescriptionSchema = joi.object({
  description: joi.string().required(),
});

const productRatingSchema = joi.object({
  rating: joi.number().required(),
});
const productImageSchema = joi.object({
  image: joi.string().required(),
});

const productSubcategorySchema = joi.object({
  subcategory: joi.array().required(),
});

const productCategorySchema = joi.object({
  category: joi.string().required(),
});

const productProducerSchema = joi.object({
  producer: joi.string().required(),
});

const productReleaseDateSchema = joi.object({
  releaseDate: joi.string().required(),
});

export function productValidation(req, res, next) {
  const {
    name,
    price,
    description,
    rating,
    image,
    category,
    subcategory,
    producer,
    releaseDate,
  } = req.body;

  const productNameValidate = productNameSchema.validate({ name });
  const productPriceValidate = productPriceSchema.validate({ price });
  const productDescriptionValidate = productDescriptionSchema.validate({
    description,
  });
  const productRatingValidate = productRatingSchema.validate({ rating });
  const productImageValidate = productImageSchema.validate({ image });
  const productCategoryValidate = productCategorySchema.validate({ category });
  const productSubcategoryValidate = productSubcategorySchema.validate({
    subcategory,
  });
  const productProducerValidate = productProducerSchema.validate({ producer });
  const productRealeaseDateValidate = productReleaseDateSchema.validate({
    releaseDate,
  });

  if (productNameValidate.error) {
    console.log("error to signup name", productNameValidate.error.details);
    return res.status(400).send("invalid name");
  }

  if (productPriceValidate.error) {
    console.log("Error to signup price", productPriceValidate.error.details);
    return res.status(400).send("invalide price");
  }
  if (productDescriptionValidate.error) {
    console.log(
      "Error to signup description",
      productDescriptionValidate.error.details
    );
    return res.status(400).send("invalid description");
  }
  if (productRatingValidate.error) {
    console.log("error to signup rating", productRatingValidate.error.details);
    return res.status(400).send("invalid rating");
  }
  if (productImageValidate.error) {
    console.log("error to signup image", productImageValidate.error.details);
    return res.status(400).send("invalid rating");
  }
  if (productCategoryValidate.error) {
    console.log(
      "error to signup category",
      productCategoryValidate.error.details
    );
    return res.status(400).send("invalid category");
  }

  if (productSubcategoryValidate.error) {
    console.log(
      "error to signup subcategory",
      productSubcategoryValidate.error.details
    );
    return res.status(400).send("invalid subcategory");
  }

  if (productProducerValidate.error) {
    console.log(
      "error to signup producer",
      productProducerValidate.error.details
    );
    return res.status(400).send("invalid producer");
  }

  if (productRealeaseDateValidate.error) {
    console.log(
      "error to signup realease date",
      productRealeaseDateValidate.error.details
    );
    return res.status(400).send("invalid realease date");
  }

  next();
}

export async function verifyCategory(req,res,next){
  const {category}=req.body;

  try{
    const categoryExist=await db.categories.findOne({category});
    if(!categoryExist){
    
    await db.categories.insertOne({category});
    const newCategory=await db.categories.findOne({category});
    res.locals._idCategory=newCategory._id;
    return next();
  }
    res.locals._idCategory=categoryExist._id;
    return next();
  }catch(error){
    console.error(error);
    return res.sendStatus(500);
  }
  
}

export async function verifySubCategory(req,res,next){
  const _idCategory=res.locals._idCategory;
  try{
    const {subcategory}= await req.body;
    const newSubCategoryArray=[];
     

    for (const element of subcategory){
      const subCategoryExist=await db.subcategories.findOne({subcategory:element});
      if(!subCategoryExist){
        const {insertedId}=await db.subcategories.insertOne({subcategory:element, _idCategory:_idCategory});
        newSubCategoryArray.push(insertedId);
      }else{
        newSubCategoryArray.push(subCategoryExist._id);
      }  
    }
     
    res.locals._idSubCategory= newSubCategoryArray;
    
    return await next();
  }catch(error){
    console.error(error);
    return res.sendStatus(500);
  }
  
}


