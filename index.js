import express from 'express';
import bodyParser from 'body-parser';

import Config from './server/config';
import Database from './server/configuration/sequelize.config';
import CanRegister from './server/configuration/middleware.config';
import Routing from './server/routing'

const config = Config['development'];

const canRegister = CanRegister(config);
const database = Database(config);
// const canRegister = require('./server/configuration/middleware.config')(config);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// const Op = require('sequelize').Op;
import { Op } from 'sequelize';

import PrinterServices from './server/services/printer-services'

const printerServices = PrinterServices(database.models);

app.use('/', Routing(config));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
