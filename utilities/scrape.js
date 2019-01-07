const axios = require("axios");
const cheerio = require("cheerio");
const ArticleController = require("../controllers/Article");

function scrapeArticles(callback) {
  axios.get("https://www.npr.org/sections/news/")
    .then(response => {
      const articles = [];
      const $ = cheerio.load(response.data);
      $("article").each(function(i, element) {
        let article = {};
        article.title = $(this).find("h2.title").text();
        article.summary = $(this).find("p.teaser").text();
        article.link = $(this).find(".title a").attr("href");
        article.imageUrl = $(this).find("img").attr("src");
        article.category = $(this).find("h3.slug a").text();
        if (article.title != "" && article.link != undefined) articles.push(article);
      });
      ArticleController.read(results => {
        const newArticles = findEightArticlesNotAlreadySaved(articles, results);
        ArticleController.addArticles(newArticles, () => {
          callback(newArticles);
        });
      });
    })
    .catch(err => console.error(err));
}

function findEightArticlesNotAlreadySaved(scrapedArticles, savedArticles) {
  const savedArticleHeadlines = savedArticles.map(article => article.title);
  const notAlreadySavedArticles = scrapedArticles.filter(article => savedArticleHeadlines.indexOf(article.title) < 0 );
  if (notAlreadySavedArticles.length < 9) return notAlreadySavedArticles;
  return notAlreadySavedArticles.slice(0, 8);
}

module.exports = scrapeArticles;