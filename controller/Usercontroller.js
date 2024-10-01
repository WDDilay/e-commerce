const db = require('../config/db');
const u = {
    login:(req, res) => {
        res.render('login');
    },
    adminpage:(req, res) => {
        res.render('adminpage');
    }
}

module.exports = u;