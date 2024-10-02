const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller.js');
const multer = require('multer');
const path = require('path');


const Productcontroller = require('../controller/ProductController.js');
const Usercontroller = require('../controller/Usercontroller.js');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads'); 
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Use a unique filename by appending the timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);  // eg. product_image-123456789.png
    }
});


const upload = multer({ storage: storage });

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
router.get('/admin', Productcontroller.adminpage);
router.post('/addProducts', upload.single('product_image'), Productcontroller.addProducts);
router.post('/deleteProduct/:product_id', Productcontroller.deleteProduct);


module.exports = router;