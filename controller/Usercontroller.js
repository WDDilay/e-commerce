const user = require('../models/UserInformation')
const db = require('../config/db');
const u = {
    login:(req, res) => {
        res.render('login');
    },

    register: (req, res) => {
        const data = req.body;
        user.register (data, (err) => {
            if(err) throw err;
            res.redirect('login')
        });
        
    },

    loginuser: (req, res) => {
        const { email, password } = req.body;
        console.log("Session:", req.session);

        user.login(email, password, (err, user) => {
            if (err) throw err;
            if (user) {
                req.session.username = user.username;
                res.render('index', { username: user.username });
            } else {
                res.send('Invalid email or password');
            }
        });
    },

    loginuser: (req, res) => {
        const { email, password } = req.body;  // Capture email and password from form
        console.log("Session:", req.session);

        // First, check if the email belongs to an admin
        user.adminLogin(email, password, (err, admin) => {
            if (err) throw err;

            if (admin) {
                // Admin login successful
                req.session.adminname = admin.adminname;
                res.redirect('/admin');  // Redirect to admin dashboard
            } else {
                // If no admin is found, check the user table
                user.login(email, password, (err, user) => {
                    if (err) throw err;
                    if (user) {
                        req.session.username = user.username;
                        res.render('index', { username: user.username });  // Redirect to user dashboard
                    } else {
                        res.send('Invalid email or password');
                    }
                });
            }
        });
    }
    
}

module.exports = u;