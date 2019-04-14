'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Routing;

var _express = require('express');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Routing(config) {
    var router = (0, _express.Router)();

    router.get('/', function (req, res) {
        res.redirect('/portal');
    });

    router.use('/api', (0, _api2.default)(config));
    router.use('/portal', (0, _portal2.default)(config));

    return router;
};