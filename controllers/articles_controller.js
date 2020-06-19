const axios = require('axios');
const cheerio = require('cheerio');
const db = require("./../models/")

module.exports = {
  saveArticle: (req, res) => {
    const savedArticle = {
      "title": req.body.title,
      'img': req.body.image,
      "p": req.body.p
    }
    console.log(savedArticle);
    db.Article
      .create(savedArticle)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findAll: (req, res) => {
    db.Article
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    res.send('/saved')
  },
  scrape: (req, res) => {
    let results = [];
    axios
      .get('https://www.nytimes.com/section/science')
      .then(function (response) {
        var $ = cheerio.load(response.data);
        $('ol').each((i, element) => {
          var title = $(element).find('h2').text();
          var img = $(element).find('img').attr('src');
          var p = $(element).find('p').text();
          if (title && img && p) {
            results.push({
              title: title,
              img: img,
              p: p,
            });
          }
        });
        res.render('index', {scraped_articles: results});
      });
  },
};
