'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EventRouting;

var _express = require('express');

// Route: /api/event
function EventRouting(config) {
    var router = (0, _express.Router)();

    router.post('/create', config.middleware.SecretOK, function (req, res) {
        // create an event
        // parameters: title, startDate, endDate
        if (req.body.title) {
            config.services.EventServices.create({
                title: req.body.title,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }).then(function (event) {
                res.status(201).json({
                    status: 200,
                    response: event
                });
            }).catch(function (err) {
                res.status(500).json({
                    status: 500,
                    response: err.message
                });
            });
        } else {
            res.status(400).json({
                status: 400,
                response: 'No title specified'
            });
        }
    });

    return router;
};