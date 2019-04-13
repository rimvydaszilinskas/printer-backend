import { Router } from 'express';

// Route: /portal/templates
export default function TemplateRouting(config) {
    const router = Router();

    router.get('/:eventID', (req, res, next) => {
        config.services.TemplateServices.eventHasTemplate(req.params.eventID)
            .then(template => {
                res.render('templating', {eventId: req.params.eventID, template: template});
            }).catch(err => {
                res.send(err);
            });
    });

    router.post('/upload', config.middleware.parser.single('image'), (req, res) => {
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
                            res.send(response);
                        }).catch(err => {
                            res.send(err);
                        });
                } else {
                    config.services.TemplateServices.create(template)
                        .then(response => {
                            res.send(response);
                        }).catch(err => {
                            res.send(err);
                        });
                }
            }).catch(err => {
                res.send(err);
            });
        
    });

    return router;
};