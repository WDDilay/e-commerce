const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller.js');


router.get('/', controller.main);
router.get('/index2', controller.index2);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/news', controller.news);
router.get('/single-news', controller.singlenews);
router.get('/shop', controller.shop);
router.get('/checkout', controller.checkout);
router.get('/single-product', controller.singleproduct);
router.get('/cart', controller.cart);
router.get('/404', controller.e404);
router.get('/login', controller.login);


module.exports = router;