'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EventRouting;

var _express = require('express');

// Route: /portal/events
function EventRouting(config) {
    var router = (0, _express.Router)();

    router.get('/', config.middleware.secured, function (req, res) {
        config.services.EventServices.getAll().then(function (events) {
            res.render('events', { events: events });
        }).catch(function (err) {
            res.render('events', { events: null });
        });
    });

    router.get('/edit/:id', config.middleware.secured, function (req, res, next) {
        config.services.EventServices.get(req.params.id).then(function (event) {
            var startTime = event.startDate.getFullYear() + '-' + (event.startDate.getMonth() + 1 < 10 ? '0' + (event.startDate.getMonth() + 1) : event.startDate.getMonth() + 1) + '-' + (event.startDate.getDate() < 10 ? '0' + event.startDate.getDate() : event.startDate.getDate());
            var endTime = event.endDate.getFullYear() + '-' + (event.endDate.getMonth() + 1 < 10 ? '0' + (event.endDate.getMonth() + 1) : event.endDate.getMonth() + 1) + '-' + (event.endDate.getDate() < 10 ? '0' + event.endDate.getDate() : event.endDate.getDate());

            config.services.PrinterServices.getAll().then(function (printers) {
                res.render('event_preview', { event: event, startTime: startTime, endTime: endTime, printers: printers });
            }).catch(function (err) {
                next('Error occured parsing printers!');
            });
        }).catch(function (err) {
            next('There is no event @' + req.params.id);
        });
    });

    router.post('/edit/:id', config.middleware.secured, function (req, res, next) {
        var event = {
            id: req.params.id,
            title: req.body.title,
            tbid: req.body.tbid,
            printerId: req.body.printer,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        config.services.EventServices.update(event).then(function (event) {
            res.redirect('/portal/events/edit/' + req.params.id);
        }).catch(function (err) {
            next(err);
        });
    });

    router.get('/delete/:id', config.middleware.secured, function (req, res, next) {
        config.services.EventServices.remove(req.params.id).then(function (resp) {
            return res.redirect('/portal/events');
        }).catch(function (err) {
            res.redirect('/portal/events/edit/' + req.params.id);
        });
    });

    router.get('/new', config.middleware.secured, function (req, res) {
        res.render('new_event');
    });

    router.post('/new', config.middleware.secured, function (req, res) {
        var event = {};

        if (req.body.startTime !== undefined && req.body.startTime !== null && req.body.startTime !== '') {
            var startSplit = req.body.startTime.split(' ');
            var hrMin = startSplit[0].split(':');
            var hr = parseInt(hrMin[0]) + startSplit[1] === 'AM' ? 0 : 12;

            event.startDate = req.body.startDate + ' ' + hr + ':' + hrMin[1];
        } else {
            event.startDate = req.body.startDate + ' 00:00';
        }
        if (req.body.endTime !== undefined && req.body.endTime !== null && req.body.endTime !== '') {
            var endSplit = req.body.endTime.split(' ');
            var _hrMin = endSplit[0].split(':');
            var _hr = parseInt(_hrMin[0]) + endSplit[1] === 'AM' ? 0 : 12;

            event.endDate = req.body.endDate + ' ' + _hr + ':' + _hrMin[1];
        } else {
            event.endDate = req.body.endDate + ' 23:59';
        }

        event.title = req.body.title;
        event.tbid = req.body.tbid !== '' && req.body.tbid !== undefined && req.body.tbid !== null ? req.body.tbid : null;

        config.services.EventServices.create(event).then(function (event) {
            res.redirect('/portal/events/edit/' + event.id);
        }).catch(function (err) {
            res.send('nok');
        });
    });

    return router;
};