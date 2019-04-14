'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Printer;
function Printer(sequelize, Sequelize) {
    return sequelize.define('printer', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        identifier: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}