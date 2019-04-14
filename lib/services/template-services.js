'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TemplateServices;

var _sequelize = require('sequelize');

function TemplateServices(models) {
    var Template = models.Template;
    var TextField = models.TextField;

    var create = function create(template) {
        return new Promise(function (resolve, reject) {
            Template.create(template).then(function (resp) {
                resolve(resp);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var addDefaultTextField = function addDefaultTextField(templateId) {
        return new Promise(function (resolve, reject) {
            createTextField({
                placeholder: 'full_name',
                templateId: templateId,
                y: 0,
                x: 0,
                align: 'right',
                font_size: '24'
            }).then(function (textField) {
                resolve(textField);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var createTextField = function createTextField(textField) {
        return new Promise(function (resolve, reject) {
            TextField.create(textField).then(function (textField) {
                resolve(textField);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var update = function update(template) {
        return new Promise(function (resolve, reject) {
            Template.update(template, {
                where: {
                    id: template.id
                }
            }).then(function (resp) {
                resolve(resp);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var eventHasTemplate = function eventHasTemplate(eventId) {
        return new Promise(function (resolve, reject) {
            Template.findOne({
                where: {
                    eventId: eventId
                },
                include: [{
                    model: TextField,
                    required: false
                }]
            }).then(function (resp) {
                resolve(resp);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var removeTextField = function removeTextField(id) {
        return new Promise(function (resolve, reject) {
            TextField.destroy({
                where: {
                    id: id
                }
            }).then(function (resp) {
                resolve(resp);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    var updateTextField = function updateTextField(textField) {
        return new Promise(function (resolve, reject) {
            TextField.update(textField, {
                where: {
                    id: textField.id
                }
            }).then(function (updated) {
                resolve(updated);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    return {
        create: create,
        update: update,
        eventHasTemplate: eventHasTemplate,
        createTextField: createTextField,
        addDefaultTextField: addDefaultTextField,
        removeTextField: removeTextField,
        updateTextField: updateTextField
    };
}