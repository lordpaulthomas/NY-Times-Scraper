const express =require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./routes");
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/NY-Times-Scraper", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, ()=> console.log("App connected to database"));

app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));