const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("first_name").notEmpty().withMessage("Completa tu Nombre"),
  body("last_name").notEmpty().withMessage("Completa tu Apellido"),
  body("email")
    .notEmpty()
    .withMessage("Debe completar Email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo valido"),
  body("gender").notEmpty().withMessage("Completa tu Genero"),
  body("birth_date").notEmpty().withMessage("Completa la Fecha"),
  body("password").notEmpty().withMessage("Completa el password"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];
