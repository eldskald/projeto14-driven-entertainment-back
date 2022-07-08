import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const dbClient = new MongoClient(MONGO_URI);
let db = null;
try {
  await dbClient.connect();
  const database = dbClient.db(DB_NAME);
  db = {
    users: database.collection("users"),
    sessions: database.collection("sessions"),
    products: database.collection("products"),
    categories: database.collection("categories"),
    subcategories: database.collection("subcategories"),
  };
} catch (err) {
  console.log(err);
}

export default db;
// export async function connectDatabase() {
//   try {
//     await dbClient.connect();
//     const database = dbClient.db(DB_NAME);
//     db = {
//       users: database.collection("users"),
//       sessions: database.collection("sessions"),
//       products: database.collection("products"),
//       categories: database.collection("categories"),
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }
