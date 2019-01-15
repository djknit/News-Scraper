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
    Article.deleteMany({})
    .then(result => callback(result))
    .catch(err => console.error(err));
  },
  findById: (_id, callback) => {
    Article.findOne({ _id })
    // .populate("comments")
    .then(result => callback(result))
    .catch(err => console.error(err));
  },
  addComment: (id, comment, author, callback) => {
    Article.updateOne({
      _id: id
    }, {
      $push: {
        comments: {
          body: comment,
          author
        }
      }
    }).then(callback)
      .catch(err => console.error(err));
  },
  deleteComment: (articleId, commentId, callback) => {
    Article.updateOne({
      _id: articleId
    }, {
      $pull: {
        comments: { _id: commentId }
      }
    }).then(callback)
      .catch(err => console.error(err));
  }
}