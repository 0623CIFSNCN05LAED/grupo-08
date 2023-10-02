const usersServices = require("../services/users-service");

const controller = {
  login: (req, res) => {
    res.render("login");
  },

  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birth_date: req.body.birth_date,
      gender: req.body.gender,
      password: req.body.password,
      avatar: req.file ? req.file.filename : "user-default-image.jpeg",
    };
    usersServices.create(user); // aca manda a la base de datos via servicio
    res.redirect("/products");
  },
};

module.exports = controller;
