const usersServices = require("../services/users-service");
const bcrypt = require("bcryptjs");

const controller = {
  login: (req, res) => {
    res.render("users/login");
  },

  register: (req, res) => {
    res.render("users/register");
  },
  processRegister: (req, res) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birth_date: req.body.birth_date,
      gender: req.body.gender,
      password: bcrypt.hashSync(req.body.password, 10), //password encriptado
      avatar: req.file ? req.file.filename : "user-default-image.jpeg",
    };
    usersServices.create(user); // Via servicio graba en base de datos
    res.redirect("/products"); //redirijo a products al finalizar
  },
};

module.exports = controller;
