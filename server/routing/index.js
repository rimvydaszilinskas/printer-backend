import { Router } from 'express';
import ApiRouting from './api';
import PortalRouting from './portal';

export default function Routing(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.redirect('/portal')
    });

    router.use('/api', ApiRouting(config));
    router.use('/portal', PortalRouting(config));

    return router;
};