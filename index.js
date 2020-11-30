var express = require('express');
var app = express(); // here I use the express() method, instead of the createServer()
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var path = require('path');
var sass = require('node-sass');
var route = require('./routes');
var db = require('./config/db');

// connect to db

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources/views'));

app.use(morgan('combined'));

// route init
route(app);
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});