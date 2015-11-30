var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// For auth0
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhh' }));

app.use(passport.initialize());
app.use(passport.session());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

// routes ==================================================
require('./app/routes')(app); // configure our routes

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});