import { Router } from 'express';

// Route: /portal/printers
export default function PrinterRouting(config) {
    const router = Router();

    router.get('/', config.middleware.secured, (req, res) => {
        config.services.PrinterServices.getAll()
            .then(printers => {
                res.render('printers', {printers: printers});
            }).catch(err => {
                res.render('printers', {printers: null})
            })
    });

    router.get('/:id', config.middleware.secured, (req, res) => {
        config.services.PrinterServices.getFull(req.params.id)
            .then(printer => {
                res.render('printer_preview', {printer: printer})
            }).catch(err => {
                console.log(err);
                res.send('err');
            });
    });

    return router;
};