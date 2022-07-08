import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = express();
server.use(express.json());
server.use(cors());

//connectDatabase();

server.use(router);

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
