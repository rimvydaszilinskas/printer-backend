'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AuthRouting;

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Route: /portal/auth
function AuthRouting(config) {
    var router = (0, _express.Router)();

    router.get('/', function (req, res) {
        if (req.isAuthenticated()) res.redirect('/portal/events/');
        res.render('login');
    });

    router.post('/login', function (req, res, next) {
        console.log('login');
        _passport2.default.authenticate('local', function (err, user, info) {
            if (user) {
                req.login(user, function (err) {
                    return res.redirect('/portal/printers/');
                });
            } else {
                console.log('err', err);
                res.redirect('/portal/auth/');
            }
        })(req, res, next);
    });

    router.get('/register', config.middleware.secured, function (req, res) {
        res.render('register');
    });

    router.post('/register', config.middleware.secured, function (req, res) {
        if (req.body.username && req.body.password) {
            if (req.body.username.length < 5 || req.body.password.length < 6) {
                res.render('register', { error: 'Credentials are too short!' });
            } else {
                config.services.UserServices.create(req.body.username, req.body.password).then(function (user) {
                    if (user) {
                        res.render('register', { user: user });
                    }
                }).catch(function (err) {
                    res.render('register', { error: err });
                });
            }
        } else {
            res.render('register', { error: 'No credentials supplied.' });
        }
    });

    router.get('/logout', function (req, res) {
        req.logOut();
        res.redirect('/portal/auth/');
    });

    return router;
};