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

    adminpage: (req, res) => {
        product.getAll((err, result) => {
            if (err) throw err;
            res.render('adminpage', { product: result }); 
        });
    },

    addProducts: (req, res) => {
        console.log(req.file); // Check if the file is being uploaded correctly
    
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
    
        const newProduct = {
            product_name: req.body.product_name,
            product_image: req.file.filename,  // Should be the filename stored by multer
            price: req.body.price,
            stock_quantity: req.body.stock_quantity
        };
    
        product.addProduct(newProduct, (err, result) => {
            if (err) throw err;
            res.redirect('/admin');  // Redirect to admin page after adding the product
        });
    },

    deleteProduct: (req, res) => {
        const productId = req.params.product_id;

        product.deleteProduct(productId, (err, result) => {
            if (err) throw err;
            res.redirect('/admin');  // After deletion, redirect back to the admin page
        });
    }
    
};

module.exports = p;