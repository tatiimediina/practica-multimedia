import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { productsRouter } from "./src/routes/products.routes.js";
import dotenv from "dotenv";

dotenv.config();

import path from "node:path";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), "src", "uploads")));

// Ruta para productos
app.use("/products", productsRouter);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
