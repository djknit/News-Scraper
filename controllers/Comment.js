const Comment = require("../models/Comment");

module.exports = {
  read: callback => {
    Comment.find({})
    .then(results => callback(results))
    .catch(err => console.error(err));
  },
  create: (comment, callback) => {
    Comment.create(comment)
    .then(result => callback ? callback(result) : "no callback")
    .catch(err => console.error(err));
  },
  deleteAll: callback => {
    Comment.deleteMany({})
    .then(result => callback(result))
    .catch(err => console.error(err));
  }
}