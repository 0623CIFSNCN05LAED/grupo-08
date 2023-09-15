const productServices = require("../services/products-service");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    const products = productServices.getAllProducts();
    res.render("products", { products });
  },

  productDetail: (req, res) => {
    res.render("productDetail");
  },

  detailById: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);
    res.render("detailById", { product });
  },
  productCart: (req, res) => {
    res.render("productCart");
  },

  // restantes agregar
};

module.exports = controller;
