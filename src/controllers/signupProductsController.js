import db from "../db.js";

export async function signupPoducts(req, res) {
  try {
    const product = req.body;
    const productAlreadydUp = await db.products.findOne({ name: product.name });
    if (productAlreadydUp) {
      return res.status(409).send("Product already registered!");
    }
    const category = await db.categories.findOne({ name: product.category }); //achando categria
    const categoryID = category._id; //achando id da categoria
    await db.subcategories.insertOne({
      ObjectId: categoryID,
      name: product.subcategory,
    });
    await db.products.insertOne(product);
    res.status(201).send(product);
  } catch (err) {
    console.log("error to signup product at database", err);
    return res.sendStatus(500);
  }
}
