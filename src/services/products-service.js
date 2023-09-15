const { product } = require("prelude-ls");
const db = require("../data/db");

const productServices = {
  getAllProducts: () => {
    return db.products.find();
  },
};

module.exports = productServices;
