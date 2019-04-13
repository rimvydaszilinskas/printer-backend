import { Op } from 'sequelize';

export default function TemplateServices(models) {
    const Template = models.Template;
    const TextField = models.TextField;

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

    const addDefaultTextField = (templateId) => {
        return new Promise((resolve, reject) => {
            createTextField({
                placeholder: 'full_name',
                templateId: templateId,
                y: 0,
                x: 0,
                align: 'right',
                font_size: '24'
            }).then(textField => {
                resolve(textField);
            }).catch(err => {
                reject(err);
            });
        });
    }

    const createTextField = (textField) => {
        return new Promise((resolve, reject) => {
            TextField.create(textField)
                .then(textField => {
                    resolve(textField);
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
                },
                include: [
                    {
                        model: TextField,
                        required: false
                    }
                ]
            }).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    };

    const removeTextField = (id) => {
        return new Promise((resolve, reject) => {
            TextField.destroy({
                where: {
                    id: id
                }
            }).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });
    };

    const updateTextField = (textField) => {
        return new Promise((resolve, reject) => {
            TextField.update(textField, {
                where: {
                    id: textField.id
                }
            }).then(updated => {
                resolve(updated);
            }).catch(err => {
                reject(err);
            });
        });
    };

    return {
        create,
        update,
        eventHasTemplate,
        createTextField,
        addDefaultTextField,
        removeTextField,
        updateTextField
    };
}