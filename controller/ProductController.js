const db = require('../config/db');
const p ={
    shop:(req, res) => {
        res.render('shop');
    },

    checkout:(req, res) => {
        res.render('checkout');
    },

    singleproduct:(req, res) => {
        res.render('single-product');
    },

    cart:(req, res) => {
        res.render('cart');
    },
};

module.exports = p;