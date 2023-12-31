const usersServices = require("../services/users-service");
const rolServiceSql = require("../services/rol-service");
const bcrypt = require("bcryptjs");

module.exports = {
  userList: async (req, res) => {
    const users = await usersServices.getAllUsers();
    res.render("users/usersList", { users });
  },
  detailById: async (req, res) => {
    const users = await usersServices.getUserById(req.params.id);
    res.render("users/userDetailById", { users });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  processLogin: async (req, res) => {
    const userLogin = await usersServices.getUserByEmail(req.body.email);

    if (userLogin) {
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, userLogin.password);
      if (isPasswordCorrect) {
        delete userLogin.password;
        req.session.userLogged = userLogin.toJSON();
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;

        //configuro cookie en login
        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 10 });
        }

        return res.redirect("/users/profile");
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "Los datos ingresados no son correctos",
          },
        },
        oldData: req.body,
      });
    }
    return res.render("users/login", {
      errors: {
        email: {
          msg: "El email no está registrado",
        },
      },
      oldData: req.body,
    });
  },
  profile: (req, res) => {
    const user = req.session.userLogged;

    return res.render("users/profile", {
      user,
    });
  },

  // REGISTER USER
  // form to register user
  register: async (req, res) => {
    const rol = await rolServiceSql.getAllRoles();
    res.render("users/register", { rol });
  },

  // Process to create user on db
  processRegister: async (req, res) => {
    const userInDb = await usersServices.getUserByEmail("email", req.body.email);
    if (userInDb) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }
    const user = await usersServices.createUser(req.body, req.file);
    res.redirect("/users/login");
  },

  edit: async (req, res) => {
    const [user, rol] = await Promise.all([usersServices.getUserById(req.params.id), rolServiceSql.getAllRoles()]);

    res.render("users/userEdit", { user, rol });
  },
  update: async (req, res) => {
    await usersServices.updateUser(req.params.id, req.body);
    res.redirect("/users/profile");
  },
  destroy: async (req, res) => {
    await usersServices.deleteUser(req.params.id);
    res.redirect("/users");
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/users/login");
  },
};
