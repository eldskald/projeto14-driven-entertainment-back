import { db } from "../db.js";

export async function signupPoducts(req, res) {
  //vai receber um objeto pelo body
  const product = req.body;
  //validar com joi
  try {
    await db.products.insertOne({ product });
    res.sendStatus(201);
  } catch (err) {
    console.log("error to signup product at database", err);
    return res.sendStatus(500);
  }
}
