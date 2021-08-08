const express = require('express');
const router = express.Router();
const productController = require('./productController.js');
const authController = require('./authController.js');
const userController = require('./userController.js');
const orderController = require('./orderController');
const mainController = require('./mainController.js')

router.use(authController.authMiddleware);


router.get('/', mainController.dashboard);

router.get('/users', userController.getUsers);
router.get('/users/create', userController.getCreateUser);
router.post('/users/create', userController.postCreateUser);
router.get('/users/:id', userController.getUser);
router.post('/users/delete', userController.deleteUser)

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);


router.get('/products', productController.getProducts)
router.get('/products/remove/:id', productController.deleteProduct)

router.get('/orders', orderController.getOrders)

module.exports = router