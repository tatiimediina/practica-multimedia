import { Router } from "express";
import { uploadImage } from "../middlewares/upload.multer.middleware.js";
import { uploadCloudinary } from "../middlewares/upload.cloudinary.middleware.js";
import {
  createProductCloudinary,
  createProductMulter,
} from "../controllers/products.controllers.js";

const productsRouter = Router();

//para un solo archivo con single(), y para muchos array()

productsRouter.post(
  "/multer",
  uploadImage,
  createProductMulter,
  (req, res) => {}
);

productsRouter.post(
  "/cloudinary",
  uploadCloudinary.single("image"),
  createProductCloudinary,
  (req, res) => {}
);

export { productsRouter };
