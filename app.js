const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router.js');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('public'));

app.listen(3000, () =>{
    console.log('Server is running on port http://localhost:3000');
});