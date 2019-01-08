const Article = require("../models/Article");

module.exports = {
  read: callback => {
    Article.find({})
    .then(results => callback(results))
    .catch(err => console.error(err));
  },
  addArticles: (articles, callback) => {
    Article.insertMany(articles)
    .then(result => callback ? callback(result) : "no callback")
    .catch(err => console.error(err));
  },
  deleteAll: callback => {
    console.log("hey")
    Article.deleteMany({})
    .then(result => callback(result))
    .catch(err => console.error(err));
  }
}