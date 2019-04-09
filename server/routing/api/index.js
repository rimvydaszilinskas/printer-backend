import { Router } from 'express';
import PrinterRouting from './printer/index';

export default function ApiRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.send(config)
    });

    router.use('/printer', PrinterRouting(config));

    return router;
};