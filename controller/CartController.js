const cartModel = require('../models/cartitemmodel');
const db = require('../config/db');

const c = {
    addToCart: (req, res) => {
        const { product_id, product_name, product_image, price } = req.body;

        // Check if there's already a cart for this session/user
        let cart_id = req.session.cart_id;

        if (!cart_id) {
            // If no cart_id in session, create a new cart in the 'cart' table
            const user_id = req.session.user_id || null;  // Use null if user_id is not available
            const created_at = new Date();

            const createCartQuery = "INSERT INTO cart (user_id, created_at) VALUES (?, ?)";
            db.query(createCartQuery, [user_id, created_at], (err, result) => {
                if (err) {
                    console.error('Error creating new cart:', err);
                    return res.status(500).send('Error creating new cart.');
                }

                cart_id = result.insertId;  // Get the new cart_id
                req.session.cart_id = cart_id;  // Save the cart_id in the session

                // Now add the product to cart_items
                addProductToCart(cart_id, product_id, price, req, res);
            });
        } else {
            // If a cart_id already exists, directly add the product to cart_items
            addProductToCart(cart_id, product_id, price, req, res);
        }
    }
};

// Helper function to add product to the cart_items table
function addProductToCart(cart_id, product_id, price, req, res) {
    const quantity = 1;  // Default quantity is 1

    // Check if the product is already in the cart
    const checkCartItemQuery = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?";
    db.query(checkCartItemQuery, [cart_id, product_id], (err, result) => {
        if (err) {
            console.error('Error checking cart item:', err);
            return res.status(500).send('Error checking cart item.');
        }

        if (result.length > 0) {
            // If product already exists in the cart, update the quantity
            const cart_item_id = result[0].cart_item_id;
            const updateQuery = "UPDATE cart_items SET quantity = quantity + 1 WHERE cart_item_id = ?";
            db.query(updateQuery, [cart_item_id], (err) => {
                if (err) {
                    console.error('Error updating cart item quantity:', err);
                    return res.status(500).send('Error updating cart item quantity.');
                }

                return res.redirect('/cart');  // Redirect to cart after updating
            });
        } else {
            // If product is not in the cart, insert a new row into cart_items
            const insertQuery = "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
            db.query(insertQuery, [cart_id, product_id, quantity, price], (err) => {
                if (err) {
                    console.error('Error adding product to cart:', err);
                    return res.status(500).send('Error adding product to cart.');
                }

                return res.redirect('/cart');  // Redirect to cart after adding
            });
        }
    });
}

module.exports = c;
