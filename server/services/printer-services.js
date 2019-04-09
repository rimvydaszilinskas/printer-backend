// const Op = require('sequelize').Op;
import { Op } from 'sequelize';

export default function PrinterServices(models) {
    const Printer = models.Printer;

    const get = (id) => {
        return new Promise(resolve => {
            Printer.findOne({
                where: {
                    id: id
                }
            }).then(printer => {
                resolve(printer);
            });
        });
    }

    const getAll = () => {
        return new Promise(resolve => {
            Printer.findAll().then(printers => {
                resolve(printers);
            });
        });
    }

    const getAllActiveEvents = () => {
        return new Promise(resolve => {
            database.models.Printer.findAll({
                include: [
                    {
                        model:database.models.Event,
                        where: {
                            [Op.and]: [
                                {
                                    startDate: {
                                        [Op.lte]: Date.now()
                                    }
                                },
                                {
                                    endDate: {
                                        [Op.gte]: Date.now()
                                    }
                                }
                            ]
                        },
                        required: false
                    }
                ]
            }).then(response => {
                resolve(response);
            });
        });
    }

    const create = (printer) => {
        return new Promise(resolve => {
            Printer.create({
                identifier: printer.identifier 
            }).then(printer => {
                resolve(printer);
            });
        });
    }

    const update = (printer) => {
        return new Promise(resolve => {
            Printer.update({
                identifier: printer.identifier
            }, {
                where: {
                    id: printer.id
                }
            }).then(updated => {
                resolve(updated);
            });
        });
    }

    const remove = (id) => {
        return new Promise(resolve => {
            Printer.delete({
                where: {
                    id: id
                }
            }).then(printer => {
                resolve(printer);
            });
        });
    }

    return { 
        get,
        getAll,
        create,
        update,
        remove,
        getAllActiveEvents
    }
}