// app/routes.js

// grab any models we need
// example: var Nerd = require('./models/nerd');
var User = require('./models/user');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
     // Auth0 server callbacks
     app.get('/api/ping', function(req, res) {
        res.send({text: "All good. You don't need to be authenticated to call this"});
     });

     app.get('/api/secured/ping', function(req, res) {
        res.send({text: "All good. You only get this message if you're authenticated"});
     });

    // Create this route simply to
     app.get('/auth0-variables.js', function(req, res) {
         res.send("var AUTH0_CLIENT_ID='"+process.env.AUTH0_CLIENT_ID+"'; "+
         "var AUTH0_DOMAIN='"+process.env.AUTH0_DOMAIN+"'; "+
         "var AUTH0_CALLBACK_URL='"+process.env.AUTH0_CALLBACK_URL+"';");
     });

    // route to handle gets go here
    app.get('/api/users', function(req, res) {

    });
    /* Sample API route
     app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });
    */

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        var path = require('path');
        res.sendFile(path.resolve(__dirname + '/../public/views/index.html')); // load our public/index.html file
    });

// Auth0 callback handler
    /*app.get('/callback',
        passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
        function(req, res) {
            if (!req.user) {
                throw new Error('user null');
            }
            res.redirect("/user");
        });*/

};

