const productServices = require("../services/products-service");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    const products = productServices.getAllProducts();
    res.render("products/products", { products });
  },
  // DETAIL - Detail from one product ID
  detailById: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);
    res.render("products/detailById", { product });
  },
  // CART
  productCart: (req, res) => {
    res.render("products/productCart");
  },

  // ADD PRODUCT
  // form to create
  add: (req, res) => {
    res.render("products/productAdd");
  },
  // Method to store data from form
  store: (req, res) => {
    const product = {
      name: req.body.name,
      brand: req.body.brand,
      price: Number(req.body.price),
      description: req.body.description,
      image: req.file ? req.file.filename : "default-image.jpeg",
    };
    productServices.createProduct(product); // aca manda a la base de datos via servicio
    res.redirect("/products");
  },

  //Form to edit
  edit: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);
    res.render("products/productEdit", { product });
  },
  update: (req, res) => {
    const product = req.body;
    const id = req.params.id;
    productServices.updateProduct(id, product);
    res.redirect("/products");
  },
  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const id = req.params.id;
    productServices.deleteProduct(id);
    res.redirect("/products");
  },
};

module.exports = controller;
