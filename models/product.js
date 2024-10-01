const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = "select * from products";
        db.query(query, callback);
    }
};

module.exports = Product;