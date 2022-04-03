const path = require("path");
const express = require("express");
const sequelize = require("./util/database");
const Product = require("./model/product");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/cart-item");
const Order = require("./model/order");
const OrderItem = require("./model/order-item");
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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "view", "notFound.html"));
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  });
