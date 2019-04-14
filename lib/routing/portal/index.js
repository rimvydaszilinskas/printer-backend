'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PortalRouting;

var _express = require('express');

var _index = require('./printers/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./events/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./templates/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./auth/index');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Route: /portal
function PortalRouting(config) {
    var router = (0, _express.Router)();

    router.get('/', function (req, res) {
        res.redirect('/portal/auth');
    });

    router.use('/printers', (0, _index2.default)(config));
    router.use('/events', (0, _index4.default)(config));
    router.use('/templates', (0, _index6.default)(config));
    router.use('/auth', (0, _index8.default)(config));
    return router;
};