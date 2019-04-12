import { Router } from 'express';
import PrinterRouting from './printers/index';
import EventRouting from './events/index';

// Route: /portal
export default function PortalRouting(config) {
    const router = Router();

    router.use('/printers', PrinterRouting(config));
    router.use('/events', EventRouting(config));
    return router;
};