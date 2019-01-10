$(() => {
  $(document).on("click", "#scrape, .scrape", () => scrape());
  $(document).on("click", "#clear", () => clear());
  $(document).on("click", ".article-comments", function() { openComments($(this).attr("article-id")) });
});

function scrape() {
  axios.get("/api/scrape")
    .then(renderArticleArea)
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

function openComments(articleId) {
  console.log(articleId);
  axios.get(`/api/comments/${articleId}`)
    .then(renderCommentsSectionAndOpenModal)
    .catch(err => console.error(err));
}

function renderCommentsSectionAndOpenModal(serverResponse) {
  const commentsSection = serverResponse.data;
  $("#modal-body").html(commentsSection);
  $("#comments-modal").modal("show");
}