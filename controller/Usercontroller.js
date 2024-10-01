const db = require('../config/db');
const u = {
    login:(req, res) => {
        res.render('login');
    }
}

module.exports = u;