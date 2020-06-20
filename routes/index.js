const router = require('express').Router();
const article = require('./../controllers/articles_controller.js');

router.get('/', (req, res) => {
  res.render('index');
});

router.route('/scrape').get(article.scrape);

router.route('/saved').get(article.findAll).post(article.saveArticle);

router.route('/saved/:id').delete(article.delete);

module.exports = router;
