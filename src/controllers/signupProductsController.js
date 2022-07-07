import { db } from "../db.js";

export async function signupPoducts(req, res) {
  const product = req.body;

  try {
    const productAlreadydUp = await db.products.findOne({ name: product.name });
    if (productAlreadydUp) {
      return res.status(409).send("Product already registered!");
    }
    await db.products.insertOne(product);
    res.status(201).send(product);
  } catch (err) {
    console.log("error to signup product at database", err);
    return res.sendStatus(500);
  }
}
