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

// Corpo tem que ser no formato:
// {
//     category: <nome da categoria>
// }
//
export async function createCategory(req, res) {
    try {
        const body = req.body;
        await db.categories.insertOne({ category: body.category });
        return res.sendStatus(201);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

// Corpo tem que ser no formato:
// {
//     subcategory: <nome da categoria>
//     category: <nome da categoria a qual pertence>
// }
//
export async function createSubcategory(req, res) {
    try {
        const { subcategory, category } = req.body;

        const catObj = await db.categories.findOne({ category })
        if (!catObj) {
            return res.sendStatus(404);
        }

        await db.subcategories.insertOne({ subcategory, _idCategory: catObj._id });
        return res.sendStatus(201);
        
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
