const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router.js');
const path = require('path');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);  
const db = require('./config/db');  

const sessionStore = new MySQLStore({}, db.promise());


app.use(session({
    key: 'session_cookie_name',   
    secret: 'your-secret-key',    
    store: sessionStore,          
    resave: false,                
    saveUninitialized: true,      
    cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use((req, res, next) => {
    res.locals.username = req.session.username || null;  
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