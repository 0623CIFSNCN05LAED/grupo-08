const usersServices = require("../services/users-service");

async function userCookiesMiddleware(req, res, next) {
  res.locals.isLogged = false;

  const emailInCookie = decodeURIComponent(req.cookies.userEmail);

  const userFromCookie = await usersServices.getUserByEmail(emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
    res.locals.isLogged = true;
    res.locals.userLogged = userFromCookie;
  }

  next();
}

module.exports = userCookiesMiddleware;
