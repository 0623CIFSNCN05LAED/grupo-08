module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  login: (req, res) => {
    res.render("login");
  },

  register: (req, res) => {
    res.render("register");
  },

  productCart: (req, res) => {
    res.render("productCart");
  },

  productAdd: (req, res) => {
    res.render("productAdd");
  },

  products: (req, res) => {
    res.render("products");
  },
};
