const { product } = require("prelude-ls");
const db = require("../data/db");

const productServices = {
  getAllProducts: () => {
    return db.products.showAll();
  },
};

module.exports = productServices;
