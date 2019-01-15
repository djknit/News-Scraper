$(() => {
  $(document).on("click", "#scrape, .scrape", scrape);
  $(document).on("click", "#clear", clear);
  $(document).on("click", ".article-comments", openComments);
  $(document).on("click", "#submit", submitComment);
  $(document).on("click", ".delete-comment", deleteComment);
});

function scrape() {
  axios.get("/api/scrape")
    .then(res => {
      return res.data.noNewArticles ? console.log('no new articles') : renderArticleArea(res);
    })
    .catch(err => console.error(err));
}

function clear() {
  axios.delete("/api/articles")
    .then(renderArticleArea)
    .catch(err => console.error(err));
}

function renderArticleArea(serverResponse) {
  const areaContent = serverResponse.data;
  $("#article-area").html(areaContent);
}

function openComments() {
  const articleId = $(this).attr("article-id");
  axios.get(`/api/comments/${articleId}`)
    .then(renderCommentsSectionAndOpenModal)
    .catch(err => console.error(err));
}

function renderCommentsSectionAndOpenModal(serverResponse) {
  const commentsSection = serverResponse.data;
  $("#my-modal-content").html(commentsSection);
  $("#comments-modal").modal("show");
}

function submitComment(event) {
  event.preventDefault();
  const articleId = $(this).attr("article-id")
  const submission = {
    articleId,
    comment: $("#comment").val(),
    name: $("#name").val()
  }
  axios.post("/api/comment", submission)
    .then(renderCommentsSectionAndOpenModal)
    .catch(err => console.error(err));
}

function deleteComment(commentId) {
  axios.post("/api/delete-comment", {
    articleId: $("#submit").attr("article-id"),
    commentId: $(this).attr("comment-id")
  }).then(renderCommentsSectionAndOpenModal)
    .catch(err => console.error(err));
}