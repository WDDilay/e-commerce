const db = require('../config/db');

const cart = {
    addItem: (data, callback) => {
        const query = "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        db.query(query, [data.cart_id, data.product_id, data.quantity, data.price], callback);
    },

    // Get all items in a cart by cart ID
    getByCartId: (cart_id, callback) => {
        const query = `
            SELECT ci.*, p.product_name, p.product_image
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ci.cart_id = ?
        `;
        db.query(query, [cart_id], callback);
    },

    getAllItems: (callback) => {
        const query = `
            SELECT ci.*, p.product_name, p.product_image
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
        `;
        db.query(query, callback);
    },
    
    

    // Update quantity for an item in the cart
    updateQuantity: (cart_item_id, quantity, callback) => {
        const query = "UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?";
        db.query(query, [quantity, cart_item_id], (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Remove item from cart
    deleteItem: (cart_item_id, callback) => {
        const query = "DELETE FROM cart_items WHERE cart_item_id = ?";
        db.query(query, [cart_item_id], callback);
    },

    addOrUpdateProduct: (cart_id, product_id, price, callback) => {
        const checkCartItemQuery = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?";
        db.query(checkCartItemQuery, [cart_id, product_id], (err, result) => {
            if (err) return callback(err);

            if (result.length > 0) {
                // Product exists, update quantity
                const cart_item_id = result[0].cart_item_id;
                const updateQuery = "UPDATE cart_items SET quantity = quantity + 1 WHERE cart_item_id = ?";
                db.query(updateQuery, [cart_item_id], callback);
            } else {
                // Product doesn't exist, insert new row
                const quantity = 1;  // Default quantity is 1
                const insertQuery = "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
                db.query(insertQuery, [cart_id, product_id, quantity, price], callback);
            }
        });
    }
}

module.exports = cart;