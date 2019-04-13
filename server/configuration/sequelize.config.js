import sequelize from 'sequelize';
import Printer from '../models/Printer';
import Event from '../models/Event';
import User from '../models/User';
import Template from '../models/Template';
import TextField from './../models/TextField';

export default function Sequelize(config) {
    const sqlize = new sequelize(config.database.connection);

    let database = {}
    database.models = {}

    const printer = Printer(sqlize, sequelize);
    const event = Event(sqlize, sequelize);
    // const user = User(sqlize, sequelize);
    const template = Template(sqlize, sequelize);
    const textField = TextField(sqlize, sequelize);

    const printerEvent = printer.hasMany(event, {foreignKey: {allowNull: true}});
    const eventsTemplate = event.hasOne(template, {foreignKey: {allowNull: true}});
    const templatesTextField = template.hasMany(textField, {foreignKey: {allowNull: false}});

    database.models.Printer = printer;
    database.models.Event = event;
    // database.models.User = user;
    database.models.Template = template;
    database.models.TextField = textField;

    if(config.database.sync) {
        sqlize.query('SET FOREIGN_KEY_CHECKS=0', {raw: true}).then(result => 
            sqlize.sync({force: config.database.forceSync})
            .then(() => {
                console.log("Database synchronized");
            })
        );
    }

    return database;
}