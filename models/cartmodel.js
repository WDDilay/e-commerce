const db = require('../config/db');

const Cart = {
    // Create a new cart
    create: (user_id, callback) => {
        const query = "INSERT INTO carts (user_id, created_at) VALUES (?, NOW())";
        db.query(query, [user_id], callback);
    },

    // Get a cart by its ID
    getById: (cart_id, callback) => {
        const query = "SELECT * FROM carts WHERE cart_id = ?";
        db.query(query, [cart_id], callback);
    },

    // Get a cart by user ID
    getByUserId: (user_id, callback) => {
        const query = "SELECT * FROM carts WHERE user_id = ?";
        db.query(query, [user_id], callback);
    },

    // Delete a cart by its ID
    delete: (cart_id, callback) => {
        const query = "DELETE FROM carts WHERE cart_id = ?";
        db.query(query, [cart_id], callback);
    }
};

module.exports = Cart;
