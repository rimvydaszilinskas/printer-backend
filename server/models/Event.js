export default function Event(sequelize, Sequelize){
    return sequelize.define('event', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tbid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
}