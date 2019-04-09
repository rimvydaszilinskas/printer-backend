import express from 'express';
import bodyParser from 'body-parser';

import Config from './server/config';
import Sequelize from './server/configuration/sequelize.config';
import SecretOK from './server/configuration/middleware.config';
import Routing from './server/routing'
import PrinterServices from './server/services/printer-services';

const config = Config['development'];

const secretOK = SecretOK(config);
const database = Sequelize(config);
const printerServices = PrinterServices(database.models);

config.middleware = {
    SecretOK: secretOK
};

config.services = {
    PrinterServices: printerServices
};

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', Routing(config));

app.listen(config.application.port, () => {
    console.log(`Listening on port ${config.application.port}`);
});
