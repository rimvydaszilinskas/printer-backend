import { Router } from 'express';

export default function PrinterRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        res.send(config)
    });

    return router;
};