'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Passport;

var _passportLocal = require('passport-local');

function Passport(config, passport) {
    passport.use(new _passportLocal.Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, passowrd, done) {
        config.services.UserServices.authorize(username, passowrd).then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, null, 'Wrong credentials');
            }
        }).catch(function (err) {
            return done(err);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        config.services.UserServices.get(id).then(function (user) {
            done(null, user);
        }).catch(function (err) {
            done(err);
        });
    });
};