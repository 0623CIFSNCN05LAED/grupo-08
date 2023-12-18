const express = require("express");
const router = express.Router();

const apiProductsController = require("../../controllers/api/products-controller");

// router.get("/", apiProductsController.list);

router.get("/count", apiProductsController.count);

router.get("/:id", apiProductsController.detailById);

router.post("/create", apiProductsController.create);

router.put("/edit/:id", apiProductsController.update);

router.delete("/delete/:id", apiProductsController.destroy);

module.exports = router;
