'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AuthRouting;

var _express = require('express');

// Route: /api/auth
function AuthRouting(config) {
    var router = (0, _express.Router)();

    router.post('/register', function (req, res) {
        if (req.body.username && req.body.password) {
            if (req.body.username.length < 5 || req.body.password.length < 6) {
                res.status(400).json({
                    status: 400,
                    response: 'Credentials are too short'
                });
            } else {
                config.services.UserServices.create(req.body.username, req.body.password).then(function (user) {
                    if (user) res.status(201).json({
                        status: 201,
                        response: {
                            id: user.id,
                            username: user.username
                        }
                    });
                }).catch(function (err) {
                    res.status(500).json({
                        status: 500,
                        response: err.message
                    });
                });
            }
        }
    });

    router.post('/login', function (req, res) {
        if (req.body.username && req.body.password) {
            config.services.UserServices.authorize(req.body.username, req.body.password).then(function (response) {
                if (response !== null) res.status(200).json({
                    status: 200,
                    response: {
                        id: response.id,
                        username: response.username
                    }
                });else res.status(401).json({
                    status: 405,
                    response: 'Unauthorized'
                });
            }).catch(function (err) {
                res.status(401).json({
                    status: 401,
                    response: err
                });
            });
        } else {
            res.status(400).json({
                status: 400,
                response: 'Missing credentials'
            });
        }
    });

    return router;
};