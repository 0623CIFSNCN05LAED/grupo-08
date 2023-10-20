const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Debe completar Email")
    .bail()
    .isEmail()
    .withMessage("El Email es incorrecto"),
  body("password").notEmpty().withMessage("Debe completar el password"),
];
