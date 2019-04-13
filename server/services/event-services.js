import { Op } from 'sequelize';

export default function EventServices(models) {
    const Event = models.Event;

    const get = (id) => {
        return new Promise((resolve, reject) => {
            Event.findOne({
                where: {
                    id: id
                }
            }).then(event => {
                resolve(event);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const getAll = () => {
        return new Promise((resolve, reject) => {
            Event.findAll().then(events => {
                resolve(events);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const create = (event) => {
        return new Promise((resolve, reject) => {
            Event.create({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                tbid: event.tbid 
            }).then(event => {
                resolve(event);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const update = (event) => {
        return new Promise((resolve, reject) => {
            Event.update({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                printerId: event.printerId === '' ? null : event.printerId,
                tbid: event.tbid === '' ? null : event.tbid
            }, {
                where: {
                    id: event.id
                }
            }).then(updated => {
                resolve(updated);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const remove = (id) => {
        return new Promise((resolve, reject) => {
            Event.delete({
                where: {
                    id: id
                }
            }).then(event => {
                resolve(event);
            }).catch(err => {
                reject(err.message);
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