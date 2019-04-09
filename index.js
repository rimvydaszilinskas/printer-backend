import express from 'express';
import bodyParser from 'body-parser';

import Config from './server/config';
import Sequelize from './server/configuration/sequelize.config';
import SecretOK from './server/configuration/middleware.config';
import Routing from './server/routing'
import PrinterServices from './server/services/printer-services';
import EventServices from './server/services/event-services';

const config = Config['development'];

const secretOK = SecretOK(config);
const database = Sequelize(config);
const printerServices = PrinterServices(database.models);
const eventServices = EventServices(database.models)

config.middleware = {
    SecretOK: secretOK
};

config.services = {
    PrinterServices: printerServices,
    EventServices: eventServices
};

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', Routing(config));

app.listen(config.application.port, (err) => {
    if(err)
        console.log('Error')
    console.log(`Listening on port ${config.application.port}`);
});