console.log("script linked")

window.onload = () => {
  $("#scrape, .scrape").on("click", () => scrape());
  document.getElementById("clear").addEventListener("click", () => clear());
};

function scrape() {
  axios.get("/api/scrape")
    .then(res => {
      console.log(res)
      document.getElementById("article-area").innerHTML = res.data;
    })
    .catch(err => console.error(err));
}

function displayArticles(articles) {
  console.log(articles);
}

function clear() {
  axios.delete("/api/articles")
    .then(res => console.log(res))
    .catch(err => console.error(err));
}