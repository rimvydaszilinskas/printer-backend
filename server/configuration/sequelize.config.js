const sequelize = require('sequelize');
const Printer = require('../models/Printer');
const Event = require('../models/Event');

module.exports = (config) => {
    const sqlize = new sequelize(config.database.connection);

    let database = {}
    database.models = {}

    const printer = Printer(sqlize, sequelize);
    const event = Event(sqlize, sequelize);

    const printerEvent = printer.hasMany(event, {foreignKey: {allowNull: true}});
    
    database.models.Printer = printer;
    database.models.Event = event;

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