const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./routes/api");

// app.use(routes);
app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log("Server listening on PORT " + PORT));