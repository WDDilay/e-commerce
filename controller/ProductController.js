const product = require('../models/product');
const p ={
    shop: (req, res) => {
        product.getAll((err, result) => {
            if (err) throw err;
            res.render('shop', { product: result }); 
        });
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