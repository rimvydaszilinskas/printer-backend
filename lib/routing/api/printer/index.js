'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PrinterRouting;

var _express = require('express');

// Route: /api/printer
function PrinterRouting(config) {
    var router = (0, _express.Router)();

    router.post('/', config.middleware.SecretOK, function (req, res) {
        // Register printer, get active event and receive info about the printer and event
        // Params: id || identifier

        if (req.body.id || req.body.identifier) {
            config.services.PrinterServices.findOne(req.body.identifier, req.body.id).then(function (printer) {
                if (printer) {
                    config.services.PrinterServices.get(printer.id).then(function (response) {
                        return res.status(200).json({
                            status: 200,
                            response: response
                        });
                    }).catch(function (err) {
                        console.log('ifErr');
                        return res.status(500).json({
                            status: 500,
                            response: err.message
                        });
                    });
                } else {
                    if (!req.body.identifier) return res.status(400).json({
                        status: 400,
                        response: 'No IDENTIFIER included to register'
                    });
                    config.services.PrinterServices.create(req.body.identifier).then(function (printer) {
                        return res.status(201).json({
                            status: 201,
                            response: printer
                        });
                    }).catch(function (err) {
                        console.log(err);
                        return res.status(500).json({
                            status: 500,
                            response: err.message
                        });
                    });
                }
            }).catch(function (err) {
                console.log('errror');
                return res.status(500).json({
                    status: 500,
                    response: err.message
                });
            });
        } else {
            res.status(400).json({
                status: 400,
                response: 'No id/identifier supplied'
            });
        }
    });

    return router;
};