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
    },

    getTotalCost: (cart_id, callback) => {
        const query = `
            SELECT SUM(ci.quantity * ci.price) AS total
            FROM cart_items ci
            WHERE ci.cart_id = ?
        `;
        db.query(query, [cart_id], (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                return callback(err);
            }
            const total = result[0].total || 0;
            console.log('Total cost calculated:', total); // Debugging line
            callback(null, total);
        });
    }
    
};

module.exports = Cart;
