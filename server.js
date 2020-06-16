const express =require("express");
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/articles_controller.js");
app.use(routes);

app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));