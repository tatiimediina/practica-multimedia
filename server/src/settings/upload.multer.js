import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

//storage

//donde y con que nombre se va a guardar la imagen
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (_req, file, cb) => {
    const fileName =
      crypto.randomUUID().toString() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

//diskStorage lo guarda en el disco momentaneamente

//limits

const maxMb = 20;
const limits = {
  fileSize: 1024 * 1024 * maxMb,
};

//filter

const fileFilter = (req, file, cb) => {
  //jpeg jpg git png
  const fileTypes = /jpg|png/;

  const allowExtname = fileTypes.test(path.extname(file.originalname));

  if (!allowExtname) {
    return cb(new Error("Solo se permiten imágenes(jpg o png"));
  }
  return cb(null, true);
};
export const upload = multer({
  storage,
  fileFilter,
  limits,
});
