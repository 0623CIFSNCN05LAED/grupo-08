const productServices = require("../services/products-service");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    const products = productServices.getAllProducts();
    res.render("products", { products });
  },

  // restantes agregar
};

module.exports = controller;
