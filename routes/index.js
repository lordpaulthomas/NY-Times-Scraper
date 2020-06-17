const router = require('express').Router();
const article = require('./../models/article.js');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
  res.render('index');
})

router.get('/scrape', (req, res) => {
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
      console.log(results);
      res.render('index', {scraped_articles: results});
    });

    router.get

});

router.get('/saved', (req, res)=>{
  res.render("saved");
})
module.exports = router;
