export default function Template(sequelize, Sequelize) {
    return sequelize.define('template', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV1
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        label: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [[
                    '12', 
                    '29', 
                    '38', 
                    '50', 
                    '54', 
                    '62', 
                    '102', 
                    '17x54', 
                    '17x87',
                    '23x23',
                    '29x42',
                    '29x90',
                    '39x90',
                    '39x48',
                    '52x29',
                    '62x29',
                    '62x100',
                    '102x51',
                    '102x152'
                ]]
            }
        },
        red: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        printer: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [[
                    'QL-500',
                    'QL-550',
                    'QL-560',
                    'QL-570',
                    'QL-580N',
                    'QL-650TD',
                    'QL-700',
                    'QL-710W',
                    'QL-720NW',
                    'QL-800',
                    'QL-810W',
                    'QL-820NWB',
                    'QL-1050',
                    'QL-1060N'
                ]]
            }
        },
        dpi_600: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        font: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });
}