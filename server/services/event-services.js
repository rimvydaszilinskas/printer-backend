// const Op = require('sequelize').Op;
import { Op } from 'sequelize';

export default function EventServices(models) {
    const Event = models.Event;

    const get = (id) => {
        return new Promise(resolve => {
            Event.findOne({
                where: {
                    id: id
                }
            }).then(event => {
                resolve(event);
            });
        });
    };

    const getAll = () => {
        return new Promise(resolve => {
            Event.findAll().then(events => {
                resolve(events);
            });
        });
    };

    const create = (event) => {
        return new Promise(resolve => {
            Event.create({
                identifier: printer.identifier 
            }).then(event => {
                resolve(event);
            });
        });
    };

    const update = (event) => {
        return new Promise(resolve => {
            Event.update({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate
            }, {
                where: {
                    id: event.id
                }
            }).then(updated => {
                resolve(updated);
            });
        });
    };

    const remove = (id) => {
        return new Promise(resolve => {
            Event.delete({
                where: {
                    id: id
                }
            }).then(event => {
                resolve(event);
            });
        });
    };

    return { 
        get,
        getAll,
        create,
        update,
        remove    
    };
}