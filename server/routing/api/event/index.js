import { Router } from 'express';

export default function EventRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.send(config)
    });

    router.post('/create', config.middleware.SecretOK, (req, res) => {
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