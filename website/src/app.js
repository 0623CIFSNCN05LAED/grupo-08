const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");
const userCookiesMiddleware = require("./middlewares/user-cookies-middleware");

// Middlewares

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

const cors = require("cors");
app.use(
  cors(
    (corsOptions = {
      origin: "*",
    })
  )
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookies());
app.use(userCookiesMiddleware);

//Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Route System
const mainRouter = require("./routes/main-router");
app.use(mainRouter);

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Se prendió en el puerto ${PORT}`);
});
