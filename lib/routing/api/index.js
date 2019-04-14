'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ApiRouting;

var _express = require('express');

var _index = require('./printer/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./event/index');

var _index4 = _interopRequireDefault(_index3);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApiRouting(config) {
    var router = (0, _express.Router)();

    router.get('/', function (req, res) {
        res.send(config);
    });

    router.use('/printer', (0, _index2.default)(config));
    router.use('/event', (0, _index4.default)(config));
    router.use('/auth', (0, _auth2.default)(config));

    return router;
};