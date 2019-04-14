import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import session from 'express-session';
import uuid from 'uuid/v4';
import FileStore from 'session-file-store';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import Config from './config';
import Sequelize from './configuration/sequelize.config';
import SecretOK from './configuration/middleware.config';
import Routing from './routing'
import PrinterServices from './services/printer-services';
import EventServices from './services/event-services';
import UserServices from './services/user-services';
import path from 'path';
import TemplateServices from './services/template-services';
import Passport from './configuration/passport.config';

const config = Config['development'];

// set up middleware for API requests
const secretOK = SecretOK(config);

config.middleware = {
    SecretOK: secretOK
};

// setup database
const database = Sequelize(config);
const printerServices = PrinterServices(database.models);
const eventServices = EventServices(database.models);
const userServices = UserServices(database.models);
const tempalteServices = TemplateServices(database.models);

config.services = {
    PrinterServices: printerServices,
    EventServices: eventServices,
    UserServices: userServices,
    TemplateServices: tempalteServices
};

// set up cloudinary for image uploads and manipulation
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'printer',
    allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

config.middleware.parser = parser;
config.middleware.secured = (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else
        res.redirect('/portal/auth');
};

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'))

app.use('/static', express.static(path.join(__dirname, '../static')))

const fStore = FileStore(session);

app.use(session({
    genid: (req) => {
        console.log(req.sessionID);
        return uuid();
    },
    // store: new fStore(),
    secret: config.application.secret,
    resave: false,
    saveUninitialized: true
}));

Passport(config, passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', Routing(config));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || config.application.port, (err) => {
    if(err)
        console.log('Error')
    console.log(`Listening on port ${process.env.PORT || config.application.port}`);
});