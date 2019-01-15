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
    res.render("partials/articles", { articles: results, layout: false });
  });
});

router.delete("/articles", (req, res) => {
  ArticleController.deleteAll(results => {
    res.render("partials/no-articles", { layout: false });
  });
});

router.get("/comments/:article_id", (req, res) => {
  ArticleController.findById(
    req.params.article_id,
    result => res.render("partials/modal-body", { article: result, layout: false })
  );
});

router.post("/comment", (req, res) => {
  const articleId = req.body.articleId;
  ArticleController.addComment(
    articleId,
    req.body.comment,
    req.body.name,
    () => res.redirect(`/api/comments/${articleId}`)
  );
});

router.post("/delete-comment", (req, res) => {
  const articleId = req.body.articleId;
  ArticleController.deleteComment(
    articleId,
    req.body.commentId,
    () => res.redirect(`/api/comments/${articleId}`)
  );
});

module.exports = router;