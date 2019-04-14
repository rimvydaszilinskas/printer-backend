import { Router } from 'express';

// Route: /portal/templates
export default function TemplateRouting(config) {
    const router = Router();

    router.get('/:eventID', config.middleware.secured, (req, res, next) => {
        config.services.TemplateServices.eventHasTemplate(req.params.eventID)
            .then(template => {
                res.render('templating', {eventId: req.params.eventID, template: template});
            }).catch(err => {
                res.send(err);
            });
    });

    router.post('/event', config.middleware.secured, (req, res, next) => {
        config.services.TemplateServices.eventHasTemplate(req.body.eventId)
            .then(resp => {
                res.send(resp);
            }).catch(err => {
                res.send(err);
            });
    })

    router.post('/upload', config.middleware.secured, config.middleware.parser.single('image'), (req, res, next) => {
        let template = {
            id: req.body.id,
            label: req.body.label === '' ? null : req.body.label,
            printer: req.body.printer === '' ? null : req.body.printer,
            font: req.body.font === '' ? null : req.body.font,
            dpi_600: req.body.dpi_600 ? true : false,
            red: req.body.red ? true : false,
            eventId: req.body.eventId
        };

        if(req.file !== undefined)
            template.image = req.file.url
        
        config.services.TemplateServices.eventHasTemplate(req.body.eventId)
            .then(resp => {
                if(resp){
                    config.services.TemplateServices.update(template)
                        .then(response => {
                            res.redirect(`/portal/templates/${req.body.eventId}`)
                        }).catch(err => {
                            next(err);
                        });
                } else {
                    config.services.TemplateServices.create(template)
                        .then(response => {
                            res.redirect(`/portal/templates/${req.body.eventId}`)
                        }).catch(err => {
                            next(err);
                        });
                }
            }).catch(err => {
                next(err);
            });
        
    });


    router.get('/textfield/add/:eventId/:id', config.middleware.secured, (req, res, next) => {
        config.services.TemplateServices.addDefaultTextField(req.params.id)
            .then(textField => {
                res.redirect(`/portal/templates/${req.params.eventId}`);
            }).catch(err => {
                next(err);
            });
    });

    router.get('/textfield/remove/:eventId/:id', config.middleware.secured, (req, res, next) => {
        config.services.TemplateServices.removeTextField(req.params.id)
            .then(resp => {
                res.redirect(`/portal/templates/${req.params.eventId}`);
            }).catch(err => {
                next(err);
            });
    });

    router.post('/textfield/update', config.middleware.secured, (req, res, next) => {
        config.services.TemplateServices.updateTextField({
            id: req.body.id,
            placeholder: req.body.placeholder,
            font_size: req.body.font_size,
            x: req.body.align === 'center' ? null : req.body.x === '' ? 0 : req.body.x,
            y: req.body.y,
            align: req.body.align === '' ? null : req.body.align
        }).then(resp => {
            res.redirect(`/portal/templates/${req.body.eventId}`)
        }).catch(err => {
            next(err);
        });
    });

    return router;
};