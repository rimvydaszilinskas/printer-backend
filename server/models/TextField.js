export default function TextField(sequelize, Sequelize) {
    return sequelize.define('textfield', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        placeholder: {
            type: Sequelize.STRING,
            allowNull: false
        },
        x: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        y: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        align: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [[
                    'right',
                    'center'
                ]]
            }
        },
        font_size: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}