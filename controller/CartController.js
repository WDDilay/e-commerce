const cartModel = require('../models/cartitemmodel');
const db = require('../config/db');

const c = {
    addToCart: (req, res) => {
        const { product_id, price } = req.body;

        // Check if there's already a cart for this session/user
        let cart_id = req.session.cart_id;

        if (!cart_id) {
            const user_id = req.session.user_id || null;
        
            // Try to fetch an existing cart for the user before creating a new one
            const getCartQuery = "SELECT cart_id FROM cart WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";
            db.query(getCartQuery, [user_id], (err, result) => {
                if (err) {
                    console.error('Error fetching user cart:', err);
                    return res.status(500).send('Error fetching user cart.');
                }
        
                if (result.length > 0) {
                    cart_id = result[0].cart_id;
                    req.session.cart_id = cart_id;
        
                    // Add product to cart using the new model method
                    cartModel.addOrUpdateProduct(cart_id, product_id, price, (err) => {
                        if (err) {
                            console.error('Error adding product to cart:', err);
                            return res.status(500).send('Error adding product to cart.');
                        }
                        res.redirect('/cart');
                    });
                } else {
                    // No existing cart, create a new one
                    const created_at = new Date();
                    const createCartQuery = "INSERT INTO cart (user_id, created_at) VALUES (?, ?)";
                    db.query(createCartQuery, [user_id, created_at], (err, result) => {
                        if (err) {
                            console.error('Error creating new cart:', err);
                            return res.status(500).send('Error creating new cart.');
                        }
        
                        cart_id = result.insertId;
                        req.session.cart_id = cart_id;
        
                        cartModel.addOrUpdateProduct(cart_id, product_id, price, (err) => {
                            if (err) {
                                console.error('Error adding product to cart:', err);
                                return res.status(500).send('Error adding product to cart.');
                            }
                            res.redirect('/cart');
                        });
                    });
                }
            });
        }
    },

    // View cart function to display the cart items
    cart: (req, res) => {
        cartModel.getAllItems((err, result) => {
            if (err) throw err;
    
            // Calculate subtotal
            const subtotal = result.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            const shippingFee = 45; // Fixed shipping fee
            const total = subtotal + shippingFee; // Total price
    
            res.render('cart', { 
                cartItems: result, 
                username: req.session.username || null,
                subtotal: subtotal,
                shippingFee: shippingFee,
                total: total
            });
        });
    },

    deltoCart: (req, res) =>{
        const itemId = req.params.cart_item_id;

        cartModel.deleteItem(itemId, (err, result) => {
            if (err) throw err;
            res.redirect('/cart');  // After deletion, redirect back to the admin page
        });
    },

   // CartController.js
   // In CartController.js
updateQuantity: (req, res) => {
    const itemId = req.params.cart_item_id;
    const newQuantity = req.body.quantity;

    if (!newQuantity) {
        return res.status(400).json({ message: 'Quantity is required' });
    }

    cartModel.updateQuantity(itemId, newQuantity, (err, result) => {
        if (err) {
            console.error('Error updating quantity:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Quantity updated successfully' });
    });
},
 addToCart: (req, res) => {
        const { product_id, price } = req.body;

        // Check if there's already a cart for this session/user
        let cart_id = req.session.cart_id;

        if (!cart_id) {
            const user_id = req.session.user_id || null;
            const created_at = new Date();

            const createCartQuery = "INSERT INTO cart (user_id, created_at) VALUES (?, ?)";
            db.query(createCartQuery, [user_id, created_at], (err, result) => {
                if (err) {
                    console.error('Error creating new cart:', err);
                    return res.status(500).send('Error creating new cart.');
                }

                cart_id = result.insertId;
                req.session.cart_id = cart_id;

                // Add product to cart using the new model method
                cartModel.addOrUpdateProduct(cart_id, product_id, price, (err) => {
                    if (err) {
                        console.error('Error adding product to cart:', err);
                        return res.status(500).send('Error adding product to cart.');
                    }
                    res.redirect('/cart');
                });
            });
        } else {
            // Cart ID exists, so directly add or update the product in the cart
            cartModel.addOrUpdateProduct(cart_id, product_id, price, (err) => {
                if (err) {
                    console.error('Error adding product to cart:', err);
                    return res.status(500).send('Error adding product to cart.');
                }
                res.redirect('/cart');
            });
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
