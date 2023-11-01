const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.render("users/login", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }
  next();
};
