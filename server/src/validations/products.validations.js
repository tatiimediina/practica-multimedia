import { body } from "express-validator";

export const productsValidations = [
  body("name").isString().notEmpty().withMessage("El nombre es obligatorio"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("La descripción es obligatoria"),
  body("price").isNumeric().notEmpty().withMessage("El precio es obligatorio"),
  body("image").isString().notEmpty().withMessage("La imagen es obligatoria"),
];
