import db from "../db.js";

const categoryList = await db.categories.find().toArray();

export default categoryList;
