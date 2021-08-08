const express = require('express');
const shopController = require('./shopController.js');
const authController = require('./authController.js');
const cartController = require('./cartController.js');
const router = express.Router();

router.use(authController.authMiddleware);
router.use(shopController.lastProductMiddleware);

router.post('/cart/add', cartController.add)
router.post('/cart/remove', cartController.remove)
router.post('/cart/change', cartController.change)
router.post('/cart/order', cartController.order)
router.get('/cart', cartController.getCart)

router.get('/', shopController.shop);

router.get('/login', authController.login);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);

module.exports = router