import { Op } from 'sequelize';

export default function TemplateServices(models) {
    const Template = models.Template;

    const create = (template) => {
        return new Promise((resolve, reject) => {
            Template.create(template)
                .then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                });
        });
    };

    const update = (template) => {
        return new Promise((resolve, reject) => {
            Template.update(template, {
                where: {
                    id: template.id
                }
            }).then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                });
        });
    };

    const eventHasTemplate = (eventId) => {
        return new Promise((resolve, reject) => {
            Template.findOne({
                where: {
                    eventId: eventId
                }
            }).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    };

    return {
        create,
        update,
        eventHasTemplate
    };
}