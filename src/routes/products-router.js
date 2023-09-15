const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  // configuracion de guardado //
  destination: path.join(__dirname, "../../public/images/"), // destino donde va a guardar el archivo
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // original name, deja extension del archivo
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
// "image" viene del form // Flta ver como subir dos fotos para el logo del producto

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
