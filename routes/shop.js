const path = require('path');
const shopController = require('../controller/shop');
const cartController = require('../controller/cart');
const router = require('express').Router();

router.get('/products', shopController.showProducts);

router.get('/product/:productId', shopController.showProduct);

router.get('/cart', cartController.getCart);

router.post('/addToCart', cartController.postCart);

module.exports = router;