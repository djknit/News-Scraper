# News Scraper

### This app scrapes news articles from National Public Radio and displays basic info about the articles along with a comment section.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Developer](#developer)

## Links
Live app: [fathomless-dusk-98996.herokuapp.com](https://fathomless-dusk-98996.herokuapp.com/)
Github repo: [github.com/djknit/news-scraper](https://github.com/djknit/news-scraper)

## Project Goals
* Use Axios to scrape the content from a news outlet website.
* Use Cheerio.js to parse the HTML that was scraped and extract the following information for each article displayed.
  * Article title
  * Article summary
  * Article link
* Store article information in a Mongo database.
* Display article information and a link to the article to the user.
* Allow users to comment on articles, see existing comments, and delete comments.

## Project Features
When the user presses the scrape button, the app scrapes the [NPR news site](https://www.npr.org/sections/news/) for article headlines, pictures, links, and summaries. If there are already articles in the database, the new article headlines are compared against the ones in the database to prevent duplicates and up to 8 new articles are saved in the database. The article information is displayed along with a link to the article and a comment section. The comment section is contained in a modal. The comments for the chosen article are retrieved from the database when the modal is opened.

## Technologies Used
#### Front End
* Handlebars
* HTML, CSS, and Javascript

#### Back End
* Node
* Express
* MongoDB
* Mongoose
* Heroku with mLab MongoDB Database

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)

This project was originally developed as a homework assignment for the KU Coding Bootcamp Full Stack Flex program and uses specifications laid out by the homework requirements.