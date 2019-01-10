const express = require("express");
const scrape = require("../utilities/scrape");
const ArticleController = require("../controllers/Article");

const router = express.Router();

router.get("/scrape", (req, res) => {
  scrape(newArticles => {
    if (newArticles.length < 1) return res.json({ noNewArticles: true });
    res.redirect("/api/articles");
  });
});

router.get("/articles", (req, res) => {
  ArticleController.read(results => {
    console.log(results);
    res.render("partials/articles", { articles: results, layout: false });
  });
});

router.delete("/articles", (req, res) => {
  ArticleController.deleteAll(results => {
    res.render("partials/no-articles", { layout: false });
  });
});

router.get("/comments/:article_id", (req, res) => {
  const id = req.params.article_id
  if (!id) res.status(400);
  ArticleController.findById(id, result => {
    res.render("partials/modal-body", { article: result, layout: false });
  });
});

module.exports = router;