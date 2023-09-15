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

// Rutas products
//GET ALL PRODUCTS
router.get("/", productsController.index);

// ruta detail - analizar si la dejamos o reemplazamos por detailById
router.get("/Detail", productsController.productDetail);

// *** PRODUCT CART ***/
router.get("/Cart", productsController.productCart);

/*** CREATE ONE PRODUCT ***/
router.get("/add", productsController.add);
router.post("/", upload.single("image"), productsController.store);
// el "image" viene del form

/*** GET ONE PRODUCT BY ID ***/
router.get("/:id/", productsController.detailById);

/*
/products/ :id /edit (GET)
Formulario de edición de productos

/products/ :id (PUT)
Acción de edición (a donde se envía el formulario):

/products/ :id (DELETE)
Acción de borrado
*/

module.exports = router;
