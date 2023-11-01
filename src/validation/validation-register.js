const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("first_name").notEmpty().withMessage("Completa tu Nombre"),
  body("last_name").notEmpty().withMessage("Completa tu Apellido"),
  body("email")
    .notEmpty()
    .withMessage("Completa tu Email")
    .bail()
    .isEmail()
    .withMessage("Formato de correo invalido"),
  body("birth_date").notEmpty().withMessage("Completa la Fecha"),
  body("password").notEmpty().withMessage("Completa el password"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Subi una imagen");
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
