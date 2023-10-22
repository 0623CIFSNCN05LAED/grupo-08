const usersServices = require("../services/users-service");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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

  // Users Login
  login: (req, res) => {
    res.render("users/login");
  },
  processlogin: (req, res) => {
    const userLogin = req.body;

    res.render("index", { userLogin });
  },

  // Users Register
  register: (req, res) => {
    res.render("users/register");
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

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
    res.redirect("/users"); //redirijo a users al finalizar
  },

  edit: (req, res) => {
    const id = req.params.id;
    const user = usersServices.getUser(id);
    res.render("users/userEdit", { user });
  },

  update: (req, res) => {
    const user = req.body;
    const id = req.params.id;
    usersServices.updateUser(id, user);
    res.redirect("/users");
  },

  destroy: (req, res) => {
    const id = req.params.id;
    usersServices.deleteUser(id);
    res.redirect("/users");
  },
};

module.exports = controller;
