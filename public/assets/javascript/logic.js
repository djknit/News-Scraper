console.log("script linked")

function scrape() {
  axios.get("/api/scrape")
    .then(res => displayArticles(res.data))
    .catch(err => console.error(err));
}

function displayArticles(articles) {
  console.log(articles);
}