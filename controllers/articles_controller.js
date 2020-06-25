const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./../models/');

module.exports = {
  saveArticle: (req, res) => {
    db.Article.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Article.find()
      .lean()
      .then((dbModel) => {
        res.render('saved', {saved_articles: dbModel});
      })
      .catch((err) => res.status(422).json(err));
  },
  scrape: (req, res) => {
    let results = [];
    axios
      .get('https://www.nytimes.com/section/science')
      .then(function (response) {
        var $ = cheerio.load(response.data);
        $('li.css-ye6x8s').each((i, element) => {
          var title = $(element).find('h2.css-1j9dxys').text();
          var img = $(element).find('img').attr('src');
          var p = $(element).find('p.css-1echdzn').text();
          var a = $(element).find('a').attr('href');
          var by = $(element).find('span.css-1n7hynb').text();
          if (title && img && p && a && by) {
            results.push({
              title: title,
              img: img,
              p: p,
              a: a,
              by: by,
            });
          }
        });
        res.render('index', {scraped_articles: results});
      });
  },
  delete: (req, res) => {
    db.Article.findById({_id: req.params.id})
      .then((dbModel) => dbModel.delete())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
