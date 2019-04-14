'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PrinterRouting;

var _express = require('express');

// Route: /portal/printers
function PrinterRouting(config) {
    var router = (0, _express.Router)();

    router.get('/', config.middleware.secured, function (req, res) {
        config.services.PrinterServices.getAll().then(function (printers) {
            res.render('printers', { printers: printers });
        }).catch(function (err) {
            res.render('printers', { printers: null });
        });
    });

    router.get('/:id', config.middleware.secured, function (req, res) {
        config.services.PrinterServices.getFull(req.params.id).then(function (printer) {
            res.render('printer_preview', { printer: printer });
        }).catch(function (err) {
            console.log(err);
            res.send('err');
        });
    });

    return router;
};