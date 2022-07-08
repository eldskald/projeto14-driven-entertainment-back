import bcrypt from "bcrypt";
import db from "../db.js";

export function login(_req, res) {
  const user = res.locals.user;
  const token = res.locals.token;
  return res.status(200).send({
    username: user.name,
    token,
  });
}

export async function signup(req, res) {
  try {
    const body = req.body;
    const passwordHash = await bcrypt.hash(body.password, 10);
    await db.users.insertOne({
      name: body.name,
      email: body.email,
      passwordHash,
    });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getSession(_req, res) {
  const user = res.locals.user;
  return res.status(200).send({
    username: user.name,
  });
}
