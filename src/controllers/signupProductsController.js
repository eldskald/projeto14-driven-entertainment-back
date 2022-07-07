import { db } from "../db.js";

export async function signupPoducts(req, res) {
  const product = req.body;

  try {
    await db.products.insertOne(product);
    res.sendStatus(201);
  } catch (err) {
    console.log("error to signup product at database", err);
    return res.sendStatus(500);
  }
}
