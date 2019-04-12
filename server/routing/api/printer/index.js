import { Router } from 'express';

// Route: /api/printer
export default function PrinterRouting(config) {
    const router = Router();

    router.post('/', config.middleware.SecretOK, (req, res) => {
        // Register printer, get active event and receive info about the printer and event
        // Params: id || identifier
        
        if(req.body.id || req.body.identifier){
            config.services.PrinterServices.findOne(req.body.identifier, req.body.id)
                .then(printer => {
                    if(printer) {
                        console.log('if')
                        config.services.PrinterServices.get(printer.id)
                            .then(response => {
                                return res.status(200).json({
                                    status: 200,
                                    response: response
                                });
                            }).catch(err => {
                                console.log('ifErr')
                                return res.status(500).json({
                                    status: 500,
                                    response: err.message
                                });
                            });
                    } else {
                        if(!req.body.identifier)
                            return res.status(400).json({
                                status: 400,
                                response: 'No IDENTIFIER included to register'
                            });
                        config.services.PrinterServices.create(req.body.identifier)
                            .then(printer => {
                                return res.status(201).json({
                                    status: 201,
                                    response: printer
                                });
                            }).catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    status: 500,
                                    response: err.message
                                });
                            });
                    }
                }).catch(err => {
                    console.log('errror')
                    return res.status(500).json({
                        status: 500,
                        response: err.message
                    });
                });
        } else {
            res.status(400).json({
                status: 400,
                response: 'No id/identifier supplied'
            });
        }
    });

    return router;
};