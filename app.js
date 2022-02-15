const path = require("path");
const express = require("express");
const sequelize = require("./util/database");
const engine = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.engine(
  "handlebars",
  engine({ layoutsDir: path.join(__dirname, "view", "layout") })
);
app.set("view engine", "handlebars");
app.set("views", "./view");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/admin", adminRouter);
app.use(shopRouter);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "view", "notFound.html"));
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize.sync().then(() => {
  app.listen(3000);
});
