const { Router } = require("express");
const router = Router();

const mainController = require("../controllers/main-controller");

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);

const productsRouter = require("./products-router");
router.use("/products", productsRouter);

module.exports = router;
