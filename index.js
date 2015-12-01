var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var bodyParser = require('body-parser')

// If not using heroku local: dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// For auth0
var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// Request body parsing middleware should be above methodOverride
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/secured', authenticate);
app.use(cors());

// routes ==================================================
require('./app/routes')(app); // configure our routes

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});