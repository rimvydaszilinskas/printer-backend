// const Op = require('sequelize').Op;
import { Op } from 'sequelize';

export default function PrinterServices(models) {
    const Printer = models.Printer;
    const Event = models.Event;
    const Template = models.Template;
    const TextField = models.TextField;

    const get = (id) => {
        return new Promise((resolve, reject) => {
            Printer.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Event,
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
                        include:[
                            {
                                model: Template,
                                include: [
                                    {
                                        model: TextField
                                    }
                                ]
                            }
                        ],
                        required: false
                    }
                ]
            }).then(printer => {
                resolve(printer);
            }).catch(err => {
                reject(err);
            });
        });
    }

    const getFull = (id) => {
        return new Promise((resolve, reject) => {
            Printer.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Event,
                        required: false
                    }
                ]
            }).then(printer => {
                resolve(printer);
            }).catch(err => {
                reject(err);
            });
        });
    }

    const findOne = (identifier=null, id=null) => {
        return new Promise((resolve, reject) => {
            if(id && id.length === 36)
                Printer.findOne({
                    where: {
                        id: id
                    }
                }).then(printer => {
                    resolve(printer);
                }).catch(err => {
                    reject(err);
                });
            else
                Printer.findOne({
                    where: {
                        identifier: identifier
                    }
                }).then(printer => {
                    resolve(printer);
                }).catch(err => {
                    reject(err);
                });
            // Printer.findOne({
            //     where: {
            //         [Op.or]: [
            //             {
            //                 identifier: identifier,
            //             },
            //             {
            //                 id: id
            //             }
            //         ]
            //     }
            // }).then(printer => {
            //     resolve(printer);
            // }).catch(err => {
            //     reject(err);
            // })
        });
    }

    const getAll = () => {
        return new Promise((resolve, reject) => {
            Printer.findAll().then(printers => {
                resolve(printers);
            }).catch(err => {
                reject(err);
            });
        });
    }

    const getAllActiveEvents = () => {
        return new Promise((resolve, reject) => {
            database.models.Printer.findAll({
                include: [
                    {
                        model: Event,
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
            }).catch(err => {
                reject(err);
            });
        });
    }

    const create = (identifier) => {
        return new Promise((resolve, reject) => {
            Printer.findOne({
                where: {
                    identifier: identifier
                }
            }).then(response => {
                if(response)
                    throw Error('Printer already exists');
                else
                    Printer.create({
                        identifier: identifier 
                    }).then(printer => {
                        resolve(printer);
                    }).catch(err => {
                        throw err;
                    });
            }).catch(err => {
                reject(err);
            });
        })
    }

    const update = (printer) => {
        return new Promise((resolve, reject) => {
            Printer.update({
                identifier: printer.identifier
            }, {
                where: {
                    id: printer.id
                }
            }).then(updated => {
                resolve(updated);
            }).catch(err => {
                reject(err);
            });
        });
    }

    const remove = (id) => {
        return new Promise((resolve, reject) => {
            Printer.delete({
                where: {
                    id: id
                }
            }).then(printer => {
                resolve(printer);
            }).catch(err => {
                reject(err);
            });
        });
    }

    return { 
        get,
        getAll,
        create,
        update,
        remove,
        getAllActiveEvents,
        findOne,
        getFull
    }
}