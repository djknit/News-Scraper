const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./config/connection")();

const apiRoutes = require("./routes/api");

const router = express.Router();

router.use("/api", apiRoutes);

// app.use(routes);
router.get("/", (req, res) => res.render("index"));

app.use(router);

app.listen(PORT, () => console.log("Server listening on PORT " + PORT));