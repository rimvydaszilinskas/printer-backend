import { Router } from 'express';
import PrinterRouting from './printer/index';
import EventRouting from './event/index';
import AuthRouting from './auth';

export default function ApiRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.send(config)
    });

    router.use('/printer', PrinterRouting(config));
    router.use('/event', EventRouting(config));
    router.use('/auth', AuthRouting(config));

    return router;
};