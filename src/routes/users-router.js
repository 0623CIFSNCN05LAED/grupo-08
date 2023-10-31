const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  // configuracion de guardado //
  destination: path.join(__dirname, "../../public/images/users/"), // destino donde va a guardar el archivo
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // original name, deja extension del archivo
  },
});

const upload = multer({ storage: storage });

// ************ Controller Require ************
//requier users controllers
const usersController = require("../controllers/users-controller");
// user register validation
const validationRegister = require("../validation/validation-register");
const registerMiddleware = require("../middlewares/register");

// user login validation
const validation = require("../validation/validation-login");
const validationErrorsLogin = require("../middlewares/login");

// Routes Users
//Get All USers /
router.get("/", usersController.usersList);

// Login
router.get("/login", usersController.login);

router.post(
  "/login",
  validation,
  validationErrorsLogin,
  usersController.processLogin
);

/*** CREATE USER ***/
// Register form
router.get("/register", usersController.register);

// register process
router.post(
  "/register",
  upload.single("avatar"),
  validationRegister,
  registerMiddleware,
  usersController.processRegister
);

// Get users Profile /
router.get("/profile", usersController.profile);

// Get users by ID /
router.get("/:id/", usersController.detailById);

//Edit user
router.get("/edit/:id", usersController.edit);
//edit process
router.put("/:id", usersController.update);

// Delete User
router.delete("/:id", usersController.destroy);

// Logout
router.get("/logout/", usersController.logout);

module.exports = router;
