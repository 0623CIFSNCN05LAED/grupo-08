const { body } = require("express-validator");

module.exports = [
  body("first_name").notEmpty().withMessage("Completa tu Nombre"),
  body("last_name").notEmpty().withMessage("Completa tu Apellido"),
  body("email")
    .notEmpty()
    .withMessage("Debe completar Email")
    .bail()
    .isEmail()
    .withMessage("El Email es incorrecto"),
  body("gender").notEmpty().withMessage("Completa tu Genero"),
  body("birth_date").notEmpty().withMessage("Completa la Fecha"),
  body("password").notEmpty().withMessage("Completa el password"),
];
