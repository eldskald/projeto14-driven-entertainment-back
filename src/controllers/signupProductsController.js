import { db } from "../db.js";

export async function signupPoducts(req, res) {
  const product = req.body;
  const _idCategory=res.locals._idCategory;
  const _idSubCategory=res.locals._idSubCategory;

  delete product.category;
  delete product.subcategory;

  try {
    const productAlreadydUp = await db.products.findOne({ name: product.name });
    if (productAlreadydUp) {
      return res.status(409).send("Product already registered!");
    }

    await db.products.insertOne({...product, _idCategory:_idCategory, _idSubCategory:_idSubCategory });
    res.status(201).send({...product, _idCategory:_idCategory, _idSubCategory:_idSubCategory });
  } catch (err) {
    console.log("error to signup product at database", err);
    return res.sendStatus(500);
  }
}
