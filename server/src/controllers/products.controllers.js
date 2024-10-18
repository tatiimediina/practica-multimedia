import { database } from "../database/db.js";
import crypto from "crypto"; // Asegúrate de tener esto para generar el UUID

// Función de validación mejorada
const validations = (name, description, image) => {
  if (!name || typeof name !== "string") {
    return {
      message: "El nombre es obligatorio",
      value: false,
    };
  }

  if (!description || typeof description !== "string") {
    return {
      message: "La descripción es obligatoria",
      value: false,
    };
  }

  if (!image || typeof image !== "string") {
    return {
      message: "La imagen es obligatoria",
      value: false,
    };
  }

  return { value: true }; // Retorna valor true si pasa todas las validaciones
};

export const createProductMulter = (req, res) => {
  const { name, description, price } = req.body;
  const id = crypto.randomUUID();

  if (!req.file) {
    return res.status(400).json({
      message: "No se ha subido archivo",
    });
  }

  const imageUrl = "http://localhost:4000/products/" + req.file.filename;

  const validation = validations(name, description, imageUrl, price);
  if (!validation.value) {
    return res.status(400).json({ message: validation.message });
  }

  const producto = {
    image: imageUrl,
    id,
    name,
    description,
    price,
  };

  database.push(producto);
  console.log(producto);

  return res.status(201).json({
    producto,
  });
};

export const createProductCloudinary = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se ha subido ningún archivo" });
  }

  // Acceder a la URL del archivo subido en Cloudinary
  const fileUrl = req.file.path;
  const { name, description, price } = req.body;
  const id = crypto.randomUUID();

  const validation = validations(name, description, fileUrl, price);
  if (!validation.value) {
    return res.status(400).json({ message: validation.message });
  }

  const producto = {
    image: fileUrl,
    id,
    name,
    description,
    price,
  };

  database.push(producto);
  console.log(producto);

  return res.status(201).json({
    producto,
  });
};
