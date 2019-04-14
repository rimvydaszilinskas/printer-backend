'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PrinterServices;

var _sequelize = require('sequelize');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // const Op = require('sequelize').Op;


function PrinterServices(models) {
    var Printer = models.Printer;
    var Event = models.Event;
    var Template = models.Template;
    var TextField = models.TextField;

    var get = function get(id) {
        return new Promise(function (resolve, reject) {
            Printer.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Event,
                    where: _defineProperty({}, _sequelize.Op.and, [{
                        startDate: _defineProperty({}, _sequelize.Op.lte, Date.now())
                    }, {
                        endDate: _defineProperty({}, _sequelize.Op.gte, Date.now())
                    }]),
                    include: [{
                        model: Template,
                        include: [{
                            model: TextField
                        }]
                    }],
                    required: false
                }]
            }).then(function (printer) {
                resolve(printer);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var getFull = function getFull(id) {
        return new Promise(function (resolve, reject) {
            Printer.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Event,
                    required: false
                }]
            }).then(function (printer) {
                resolve(printer);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var findOne = function findOne() {
        var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        return new Promise(function (resolve, reject) {
            if (id && id.length === 36) Printer.findOne({
                where: {
                    id: id
                }
            }).then(function (printer) {
                resolve(printer);
            }).catch(function (err) {
                reject(err);
            });else Printer.findOne({
                where: {
                    identifier: identifier
                }
            }).then(function (printer) {
                resolve(printer);
            }).catch(function (err) {
                reject(err);
            });
            // Printer.findOne({
            //     where: {
            //         [Op.or]: [
            //             {
            //                 identifier: identifier,
            //             },
            //             {
            //                 id: id
            //             }
            //         ]
            //     }
            // }).then(printer => {
            //     resolve(printer);
            // }).catch(err => {
            //     reject(err);
            // })
        });
    };

    var getAll = function getAll() {
        return new Promise(function (resolve, reject) {
            Printer.findAll().then(function (printers) {
                resolve(printers);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var getAllActiveEvents = function getAllActiveEvents() {
        return new Promise(function (resolve, reject) {
            database.models.Printer.findAll({
                include: [{
                    model: Event,
                    where: _defineProperty({}, _sequelize.Op.and, [{
                        startDate: _defineProperty({}, _sequelize.Op.lte, Date.now())
                    }, {
                        endDate: _defineProperty({}, _sequelize.Op.gte, Date.now())
                    }]),
                    required: false
                }]
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var create = function create(identifier) {
        return new Promise(function (resolve, reject) {
            Printer.findOne({
                where: {
                    identifier: identifier
                }
            }).then(function (response) {
                if (response) throw Error('Printer already exists');else Printer.create({
                    identifier: identifier
                }).then(function (printer) {
                    resolve(printer);
                }).catch(function (err) {
                    throw err;
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var update = function update(printer) {
        return new Promise(function (resolve, reject) {
            Printer.update({
                identifier: printer.identifier
            }, {
                where: {
                    id: printer.id
                }
            }).then(function (updated) {
                resolve(updated);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var remove = function remove(id) {
        return new Promise(function (resolve, reject) {
            Printer.delete({
                where: {
                    id: id
                }
            }).then(function (printer) {
                resolve(printer);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    return {
        get: get,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove,
        getAllActiveEvents: getAllActiveEvents,
        findOne: findOne,
        getFull: getFull
    };
}