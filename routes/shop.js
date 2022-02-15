const path = require('path');
const shopController = require('../controller/shop');
const router = require('express').Router();

router.get('/products', shopController.showProducts);

router.get('/product/:productId', shopController.showProduct);

module.exports = router;