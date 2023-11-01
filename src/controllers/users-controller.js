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
      return res.render("users/login", {
        errors: {
          email: {
            msg: "La contraseña es inválida",
          },
        },
        oldData: req.body,
      });
    }
    return res.render("users/login", {
      errors: {
        email: {
          msg: "El email no esta regsitrado",
        },
      },
      oldData: req.body,
    });
  },

  // Users Register
  register: (req, res) => {
    res.render("users/register");
  },

  processRegister: (req, res) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birth_date: req.body.birth_date,
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

  profile: (req, res) => {
    return res.render("users/profile");
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
