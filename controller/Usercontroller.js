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
        
    }
    
}

module.exports = u;