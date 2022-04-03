const Product = require("../model/product");

exports.showProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/shop", {
      pageTitle: "Shop",
      bShop: true,
      bAddProduct: false,
      products: products.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
        };
      })
    });
  });
};

exports.showProduct = (req, res, next) => {
  let id = parseInt(req.params.productId);
  Product.findByPk(id).then((product) => {
    res.render("shop/product", {
      pageTitle: "Product",
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
    });
  });
};
