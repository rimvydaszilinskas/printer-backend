import express from 'express';
import bodyParser from 'body-parser';

import Config from './server/config';
import Sequelize from './server/configuration/sequelize.config';
import SecretOK from './server/configuration/middleware.config';
import Routing from './server/routing'
import PrinterServices from './server/services/printer-services';
import EventServices from './server/services/event-services';
import UserServices from './server/services/user-services';
import path from 'path';

const config = Config['development'];

// set up middleware for API requests
const secretOK = SecretOK(config);

config.middleware = {
    SecretOK: secretOK
};

// setup database
const database = Sequelize(config);
const printerServices = PrinterServices(database.models);
const eventServices = EventServices(database.models)
const userServices = UserServices(database.models)

config.services = {
    PrinterServices: printerServices,
    EventServices: eventServices,
    UserServices: userServices
};

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use('/', Routing(config));

app.get('*', (req, res) => {
    res.send('wrong path')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});

app.listen(config.application.port, (err) => {
    if(err)
        console.log('Error')
    console.log(`Listening on port ${config.application.port}`);
});