const express = require('express');
const app = express ();
const path = require('path');


app.use(express.static(path.join(__dirname, '../public')));


const mainRouter = require("./routes/main-router");
app.use(mainRouter);

app.set("view engine", "ejs");
app.set("views", "./src/views") // Set carpeta views que utiliza ejs

const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Se prendió en el puerto ${PORT}`);
});