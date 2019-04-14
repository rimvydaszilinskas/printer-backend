'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Sequelize;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Printer = require('../models/Printer');

var _Printer2 = _interopRequireDefault(_Printer);

var _Event = require('../models/Event');

var _Event2 = _interopRequireDefault(_Event);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Template = require('../models/Template');

var _Template2 = _interopRequireDefault(_Template);

var _TextField = require('./../models/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Sequelize(config) {
    var sqlize = new _sequelize2.default(config.database.connection);

    var database = {};
    database.models = {};

    var printer = (0, _Printer2.default)(sqlize, _sequelize2.default);
    var event = (0, _Event2.default)(sqlize, _sequelize2.default);
    var user = (0, _User2.default)(sqlize, _sequelize2.default);
    var template = (0, _Template2.default)(sqlize, _sequelize2.default);
    var textField = (0, _TextField2.default)(sqlize, _sequelize2.default);

    var printerEvent = printer.hasMany(event, { foreignKey: { allowNull: true } });
    var eventsTemplate = event.hasOne(template, { foreignKey: { allowNull: true } });
    var templatesTextField = template.hasMany(textField, { foreignKey: { allowNull: false } });

    database.models.Printer = printer;
    database.models.Event = event;
    database.models.User = user;
    database.models.Template = template;
    database.models.TextField = textField;

    if (config.database.sync) {
        sqlize.query('SET FOREIGN_KEY_CHECKS=0', { raw: true }).then(function (result) {
            return sqlize.sync({ force: config.database.forceSync }).then(function () {
                console.log("Database synchronized");
            });
        });
    }

    return database;
}