const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = "select * from products";
        db.query(query, callback);
    },

    addProduct: (data, callback) => {
        const query = "INSERT INTO products (product_name, product_image, price, stock_quantity) VALUES (?, ?, ?, ?)";
        db.query(query,  [data.product_name, data.product_image, data.price, data.stock_quantity], callback);
    },

    deleteProduct: (product_id, callback) => {
        const deleteCartItemsQuery = "DELETE FROM cart_items WHERE product_id = ?";
        db.query(deleteCartItemsQuery, [product_id], (err, result) => {
            if (err) {
                console.error('Error deleting cart items:', err);
                return callback(err, null);
            }

            // After successfully deleting cart items, delete the product
            const deleteProductQuery = "DELETE FROM products WHERE product_id = ?";
            db.query(deleteProductQuery, [product_id], callback);
        });
    },

    getById: (product_id, callback) => {
        const query = "SELECT * FROM products WHERE product_id = ?";
        db.query(query, [product_id], callback);
    }

    
    
};

module.exports = Product;