// app/routes.js

// grab any models we need
// example: var Nerd = require('./models/nerd');
//var passport = require('passport');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    /* sample api route
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

    // Auth0 server callbacks
    app.get('/ping', function(req, res) {
        res.send(200, {text: "All good. You don't need to be authenticated to call this"});
    });

    app.get('/secured/ping', function(req, res) {
        res.send(200, {text: "All good. You only get this message if you're authenticated"});
    })

};

