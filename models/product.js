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
        const query = "DELETE FROM products WHERE product_id = ?";
        db.query(query, [product_id], callback);
    }
};

module.exports = Product;