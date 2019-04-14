'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _multerStorageCloudinary = require('multer-storage-cloudinary');

var _multerStorageCloudinary2 = _interopRequireDefault(_multerStorageCloudinary);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sessionFileStore = require('session-file-store');

var _sessionFileStore2 = _interopRequireDefault(_sessionFileStore);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _sequelize = require('./configuration/sequelize.config');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _middleware = require('./configuration/middleware.config');

var _middleware2 = _interopRequireDefault(_middleware);

var _routing = require('./routing');

var _routing2 = _interopRequireDefault(_routing);

var _printerServices = require('./services/printer-services');

var _printerServices2 = _interopRequireDefault(_printerServices);

var _eventServices = require('./services/event-services');

var _eventServices2 = _interopRequireDefault(_eventServices);

var _userServices = require('./services/user-services');

var _userServices2 = _interopRequireDefault(_userServices);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _templateServices = require('./services/template-services');

var _templateServices2 = _interopRequireDefault(_templateServices);

var _passport3 = require('./configuration/passport.config');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _config2.default['development'];

// set up middleware for API requests
var secretOK = (0, _middleware2.default)(config);

config.middleware = {
    SecretOK: secretOK
};

// setup database
var database = (0, _sequelize2.default)(config);
var printerServices = (0, _printerServices2.default)(database.models);
var eventServices = (0, _eventServices2.default)(database.models);
var userServices = (0, _userServices2.default)(database.models);
var tempalteServices = (0, _templateServices2.default)(database.models);

config.services = {
    PrinterServices: printerServices,
    EventServices: eventServices,
    UserServices: userServices,
    TemplateServices: tempalteServices
};

// set up cloudinary for image uploads and manipulation
_cloudinary2.default.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

var storage = (0, _multerStorageCloudinary2.default)({
    cloudinary: _cloudinary2.default,
    folder: 'printer',
    allowedFormats: ['jpg', 'png']
});

var parser = (0, _multer2.default)({ storage: storage });

config.middleware.parser = parser;
config.middleware.secured = function (req, res, next) {
    if (req.isAuthenticated()) next();else res.redirect('/portal/auth');
};

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());

app.set('view engine', 'pug');
app.set('views', _path2.default.join(__dirname, '../views'));

app.use('/static', _express2.default.static(_path2.default.join(__dirname, '../static')));

var fStore = (0, _sessionFileStore2.default)(_expressSession2.default);

app.use((0, _expressSession2.default)({
    genid: function genid(req) {
        console.log(req.sessionID);
        return (0, _v2.default)();
    },
    // store: new fStore(),
    secret: config.application.secret,
    resave: false,
    saveUninitialized: true
}));

(0, _passport4.default)(config, _passport2.default);

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use('/', (0, _routing2.default)(config));

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || config.application.port, function (err) {
    if (err) console.log('Error');
    console.log('Listening on port ' + (process.env.PORT || config.application.port));
});