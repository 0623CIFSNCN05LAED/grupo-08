const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  // configuracion de guardado // falta probar
  destination: path.join(__dirname, "../../public/images/"), // destino donde va a guardar el archivo
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // extname toma la extension del archivo, original name, deja el original
  },
});

const upload = multer({ storage: storage });

// ************ Controller Require ************
const productsController = require("../controllers/products-controller");

// Desde estas rutas va todo por products

router.get("/", productsController.index);

/*
router.get("/productAdd", mainController.productAdd)
/products (POST) Acción de creación (a donde se envía el formulario)
/products :id (GET)Detalle de un producto particular

/products/ :id /edit (GET)
Formulario de edición de productos

/products/ :id (PUT)
Acción de edición (a donde se envía el formulario):

/products/ :id (DELETE)
Acción de borrado

router.get("/productCart", mainController.productCart);
router.get("/productDetail", mainController.productDetail);
;
*/

module.exports = router;
