const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mainRouter = require("./routes/main-router");
app.use(mainRouter);

app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Set carpeta views ejs

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Se prendió en el puerto ${PORT}`);
});
