'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Event;
function Event(sequelize, Sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}