const productController = require('../controller/product');
const router = require('express').Router();

router.get('/products', productController.showAdminProducts);

router.get('/add-product', productController.addProduct);
router.post('/add-product', productController.postProduct);

router.get('/edit-product/:productId', productController.editProduct);
router.post('/edit-product', productController.updateProduct);

router.post('/delete-product', productController.deleteProduct);

module.exports = router;