const express = require("express");
const scrape = require("../utilities/scrape");
const ArticleController = require("../controllers/Article");

const router = express.Router();

router.get("/scrape", (req, res) => {
  scrape(newArticles => res.json(newArticles));
});

router.get("/articles", (req, res) => {
  ArticleController.read(results => res.json(results));
});

router.delete("/articles", (req, res) => {
  ArticleController.deleteAll(results => res.json(results));
});

module.exports = router;