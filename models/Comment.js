const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  title: String,
  summary: String,
  link: String,
  imageUrl: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;