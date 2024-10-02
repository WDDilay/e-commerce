const db = require('../config/db');

const info = {
    admin: (email, password, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);

            if (results.length === 0) {
                // No user found with this email
                return callback(null, false);
            }

            const user = results[0];

            // Check if the password matches (this is a simple plain-text comparison, but you should hash passwords)
            if (user.password === password) {
                // Password matches, return user data
                return callback(null, user);
            } else {
                // Password doesn't match
                return callback(null, false);
            }
        });
    },

    
};

module.exports = info;
