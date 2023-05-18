const axios = require("axios");
const cheerio = require("cheerio");
const ArticleController = require("../controllers/Article");

function scrapeArticles(callback) {
  axios.get("https://www.npr.org/sections/news/")
    .then(result => {
      const articles = [];
      const $ = cheerio.load(result.data);
      $("article").each(function(i, element) {
        let article = {};
        article.title = $(this).find("h2.title").text();
        const unfixedSummary = $(this).find("p.teaser").text().split(" • ");
        article.summary = unfixedSummary[1];
        article.date = unfixedSummary[0];
        article.link = $(this).find(".title a").attr("href");
        const unfixedImageUrl = $(this).find("img").attr("src");
        let imageUrl = unfixedImageUrl;
        if (unfixedImageUrl && unfixedImageUrl.indexOf('.jpg') != -1) {
          imageUrl = unfixedImageUrl.slice(0, unfixedImageUrl.indexOf('.jpg') + '.jpg'.length)
        }
        article.imageUrl = imageUrl;
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