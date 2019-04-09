import { Router } from 'express';
import ApiRouting from './api/index';

export default function Routing(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.send(config)
    });

    router.use('/api', ApiRouting(config));

    return router;
};