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
require("./models/Article");

const apiRoutes = require("./routes/api");

const router = express.Router();

router.use("/api", apiRoutes);

const ArticleController = require("./controllers/Article");

router.get("/", (req, res) => {
  ArticleController.read(results => {
    res.render("index", { articles: results, hasArticles: results.length > 0 });
  });
});

app.use(router);

app.listen(PORT, () => console.log("Server listening on PORT " + PORT));