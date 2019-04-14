'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EventServices;

var _sequelize = require('sequelize');

function EventServices(models) {
    var Event = models.Event;

    var get = function get(id) {
        return new Promise(function (resolve, reject) {
            Event.findOne({
                where: {
                    id: id
                }
            }).then(function (event) {
                resolve(event);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var getAll = function getAll() {
        return new Promise(function (resolve, reject) {
            Event.findAll().then(function (events) {
                resolve(events);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var create = function create(event) {
        return new Promise(function (resolve, reject) {
            Event.create({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                tbid: event.tbid
            }).then(function (event) {
                resolve(event);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var update = function update(event) {
        return new Promise(function (resolve, reject) {
            Event.update({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                printerId: event.printerId === '' ? null : event.printerId,
                tbid: event.tbid === '' ? null : event.tbid
            }, {
                where: {
                    id: event.id
                }
            }).then(function (updated) {
                resolve(updated);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var remove = function remove(id) {
        return new Promise(function (resolve, reject) {
            Event.destroy({
                where: {
                    id: id
                }
            }).then(function (event) {
                resolve(event);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    return {
        get: get,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove
    };
}