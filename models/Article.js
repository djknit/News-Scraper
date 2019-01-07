const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  summary: String,
  link: String,
  imageUrl: String,
  category: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;