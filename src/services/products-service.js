const { product } = require("prelude-ls");
const db = require("../data/db");

const productServices = {
  getAllProducts: () => {
    return db.products.showAll();
  },
  getProduct: (id) => {
    const product = db.products.findById(id);
    return product;
  },
  createProduct: (product) => {
    db.products.create(product);
  },
};

module.exports = productServices;
