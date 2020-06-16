const router = require("express").Router();
// const article = require("./../models/article.js");

router.get("/", (req, res) => {
  res.render("index");
})

module.exports = router;