const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  // configuracion de guardado //
  destination: path.join(__dirname, "../../public/images/products"), // destino donde va a guardar el archivo
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

/*** GET ONE PRODUCT BY ID ***/
router.get("/:id/", productsController.detailById);

// *** PRODUCT CART ***/
router.get("/Cart", productsController.productCart);

/*** CREATE ONE PRODUCT ***/
router.get("/add", productsController.add);
router.post("/", upload.single("image"), productsController.store);
// "image" viene del form // Falta ver como subir dos fotos para el logo del producto

/*** EDIT ONE PRODUCT ***/
//Formulario de edición de productos
router.get("/edit/:id", productsController.edit);
//Acción de edición (a donde se envía el formulario):
router.put("/:id", productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/:id", productsController.destroy);

module.exports = router;
