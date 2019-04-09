import { Router } from 'express';

// Route: /api/event
export default function EventRouting(config) {
    const router = Router();

    router.post('/create', config.middleware.SecretOK, (req, res) => {
        // create an event
        // parameters: title, startDate, endDate
        if(req.body.title) {
            config.services.EventServices.create({
                title: req.body.title,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }).then(event => {
                res.status(201).json({
                    status: 200,
                    response: event
                });
            }).catch(err => {
                res.status(500).json({
                    status: 500,
                    response: err.message
                });
            });
        } else {
            res.status(400).json({
                status: 400,
                response: 'No title specified'
            });
        }
    });

    return router;
};