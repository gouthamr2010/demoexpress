const Product = require("../model/product");

exports.showAdminProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("admin/adminProduct", {
      pageTitle: "Admin Products",
      products: products.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
        };
      }),
    });
  });
};

exports.addProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    bShop: false,
    bAddProduct: true,
  });
};

exports.postProduct = (req, res, next) => {
  let title = req.body.title;
  let price = parseInt(req.body.price);
  let description = req.body.description;
  Product.create({
    title: title,
    price: price,
    description: description,
  })
    .then((result) => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.editProduct = (req, res, next) => {
  let id = parseInt(req.params.productId);
  Product.findByPk(id).then((product) => {
    res.render("admin/edit-product", {
      pageTitle: "Product",
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  let id = parseInt(req.body.id);
  let title = req.body.title;
  let price = parseInt(req.body.price);
  let description = req.body.description;
  Product.findByPk(id)
    .then((product) => {
      product.id = id;
      product.title = title;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  let id = parseInt(req.body.id);
  Product.findByPk(id)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    res.redirect("/products");
  })
  .catch(error => {
    console.log(error);
  })
}
