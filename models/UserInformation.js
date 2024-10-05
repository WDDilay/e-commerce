const db = require('../config/db');

const info = {
    register: (data, callback) => {
        const query = "insert into users (username, email, password, phone) values (?,?,?,?)";
        db.query(query, [data.username, data.email, data.password, data.phone], callback);
    },

    login: (email, password, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);

            if (results.length === 0) {
                // No user found with this email
                return callback(null, false);
            }

            const users = results[0];

            // Check if the password matches (this is a simple plain-text comparison, but you should hash passwords)
            if (users.password === password) {
                // Password matches, return user data
                return callback(null, users);
            } else {
                // Password doesn't match
                return callback(null, false);
            }
        });
    },

    adminLogin: (email, password, callback) => {
        const query = "SELECT * FROM admin WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);

            if (results.length === 0) {
                return callback(null, false);  // No admin found
            }

            const admin = results[0];

            if (admin.password === password) {
                return callback(null, admin);  // Password matches
            } else {
                return callback(null, false);  // Password mismatch
            }
        });
    }
};

module.exports = info;
