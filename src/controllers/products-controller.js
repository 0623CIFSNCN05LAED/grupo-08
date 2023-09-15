const productServices = require("../services/products-service");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    const products = productServices.getAllProducts();
    res.render("products", { products });
  },

  productDetail: (req, res) => {
    res.render("productDetail");
  },
  // DETAIL - Detail from one product ID
  detailById: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);
    res.render("detailById", { product });
  },
  // CART
  productCart: (req, res) => {
    res.render("productCart");
  },

  // ADD PRODUCT
  // form to create
  add: (req, res) => {
    res.render("productAdd");
  },
  // Method to store data from form
  store: (req, res) => {
    console.log("body", req.body);
    console.log("file", req.file);

    const product = {
      name: req.body.name,
      marca: req.body.marca,
      sku: req.body.sku,
      stock: req.body.stock,
      color: req.body.color,
      price: Number(req.body.price),
      delivery: req.body.delivery,
      promotion: req.body.promotion,
      discount: Number(req.body.discount),
      logo: "default-logo.jpg",
      description: req.body.description,
      category: req.body.category,
      image: req.file ? req.file.filename : "default-image.jpeg",
    };
    productServices.createProduct(product); // aca manda a la base de datos a travez del servicio
    res.redirect("/products");
  },

  // faltan restantes agregar
};

module.exports = controller;
