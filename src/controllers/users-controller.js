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

  profile: (req, res) => {
    return res.render("users/profile");
  },

  // Users Login
  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    const userLogin = usersServices.getfindByEmail("email", req.body.email);

    if (userLogin) {
      const comparePassword = bcrypt.compareSync(
        req.body.password,
        userLogin.password
      );
      if (comparePassword) {
        delete userLogin.password;
        req.session.userLogged = userLogin;

        //configuro cookie en log in
        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 10 });
        }

        res.render("users/profile", { userLogin });
      }
    }
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

  // lOGOUT FALTA CERRAR LA SESION DESDE PROFILE
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = controller;
