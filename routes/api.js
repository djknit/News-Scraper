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
    // res.render("articles", { articles: results }, { layout: "section.handlebars"})
    res.render("articles", { articles: results, layout: false })
    // res.json({hey: "yeah"})
  });
});

router.delete("/articles", (req, res) => {
  ArticleController.deleteAll(results => res.json(results));
});

module.exports = router;