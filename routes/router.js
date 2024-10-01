const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller.js');
const Productcontroller = require('../controller/ProductController.js');
const Usercontroller = require('../controller/Usercontroller.js');


router.get('/', controller.main);
router.get('/index2', controller.index2);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/news', controller.news);
router.get('/single-news', controller.singlenews);
router.get('/shop', Productcontroller.shop);
router.get('/checkout', Productcontroller.checkout);
router.get('/single-product', Productcontroller.singleproduct);
router.get('/cart', Productcontroller.cart);
router.get('/404', controller.e404);
router.get('/login', Usercontroller.login);
router.get('/adminpage', Usercontroller.adminpage);


module.exports = router;