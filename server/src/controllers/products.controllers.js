import { database } from "../database/db.js";

export const createProductMulter = (req, res) => {
  const { name, description, price } = req.body;

  const id = crypto.randomUUID();

  if (!req.file) {
    return res.status(400).json({
      message: "No se ha subido archivo",
    });
  }

  const producto = {
    image: "http://localhost:4000/products/" + req.body.image,
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

  // acceder a la URL del archivo subido en Cloudinary
  const fileUrl = req.file.path;
  const { name, description, price } = req.body;

  const id = crypto.randomUUID();

  const producto = {
    image: fileUrl,
    id,
    name,
    description,
    price,
  };

  database.push(producto);
  console.log(producto);
  return res.status(200).json({
    producto,
  });
};
