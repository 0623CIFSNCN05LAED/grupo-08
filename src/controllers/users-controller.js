const usersServices = require("../services/users-service");
const bcrypt = require("bcryptjs");

const controller = {
  usersList: (req, res) => {
    const users = usersServices.getAllUsers();
    res.render("users/usersList", { users });
  },

  detailById: (req, res) => {
    const id = req.params.id;
    const users = usersServices.getUser(id);
    res.render("users/userDetailById", { users });
  },

  login: (req, res) => {
    res.render("users/login");
  },
  processlogin: (req, res) => {
    const userLogin = req.body;

    res.render("index", { userLogin });
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
    res.redirect("/users"); //redirijo a products al finalizar
  },
};

module.exports = controller;
