const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router.js');
const path = require('path');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.username = req.session.username || null;  // If not logged in, username will be null
    next();
});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.listen(3000, () =>{
    console.log('Server is running on port http://localhost:3000');
});