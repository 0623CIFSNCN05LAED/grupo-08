const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Ingresa tu Email")
    .bail()
    .isEmail()
    .withMessage("El Email es incorrecto"),
  body("password").notEmpty().withMessage("Completa el password"),
];
