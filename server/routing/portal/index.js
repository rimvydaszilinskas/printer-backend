import { Router } from 'express';
import PrinterRouting from './printers/index';
import EventRouting from './events/index';
import TemplateRouting from './templates/index';
import AuthRouting from './auth/index';

// Route: /portal
export default function PortalRouting(config) {
    const router = Router();

    router.use('/printers', PrinterRouting(config));
    router.use('/events', EventRouting(config));
    router.use('/templates', TemplateRouting(config));
    router.use('/auth', AuthRouting(config));
    return router;
};