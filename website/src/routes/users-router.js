const express = require("express");
const router = express.Router();

// ** Multer middleware **//
const multerMiddleware = require("../middlewares/multer-middleware");
const usersUpload = multerMiddleware("users");

// ************ Controller Require ************
//requier users controllers
const usersController = require("../controllers/users-controller");
// user register validation
const validationRegister = require("../validation/validation-register");
const registerMiddleware = require("../middlewares/register");

// user login validation
const validation = require("../validation/validation-login");
const validationErrorsLogin = require("../middlewares/login");

// Guest - User routes middleware
const guestMiddleware = require("../middlewares/guest-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
//guestMiddleware, ver este middleware para el login

// Routes Users
//Get All USers /
router.get("/", usersController.userList);

// Login
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validation, validationErrorsLogin, usersController.processLogin);

// Get users Profile /
router.get("/profile", authMiddleware, usersController.profile);

// Logout
router.get("/logout", usersController.logout);

/*** CREATE USER ***/
// Register form
router.get("/register", guestMiddleware, usersController.register);

// register process
router.post(
  "/register",
  usersUpload.single("avatar"),
  validationRegister,
  registerMiddleware,
  usersController.processRegister
);

// Get users by ID /
router.get("/:id", usersController.detailById);

//Edit user
router.get("/edit/:id", usersController.edit);
//edit process
router.put("/:id", usersController.update);

// Delete User
router.delete("/:id", usersController.destroy);

module.exports = router;
