const {Router} = require("express"); 
const router = Router();

const mainController = require("../controllers/main-controller");


router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);
router.get("/productCart", mainController.productCart);
router.get("/productDetail", mainController.productDetail);


module.exports = router;