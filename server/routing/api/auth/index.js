import { Router } from 'express';

// Route: /api/auth
export default function AuthRouting(config) {
    const router = Router();

    router.post('/register', (req, res) => {
        if(req.body.username && req.body.password) {
            if(req.body.username.length < 5 || req.body.password.length < 6) {
                res.status(400).json({
                    status: 400,
                    response: 'Credentials are too short'
                });
            } else {
                config.services.UserServices.create(req.body.username, req.body.password)
                    .then(user => {
                        if(user)
                            res.status(201).json({
                                status: 201,
                                response: {
                                    id: user.id,
                                    username: user.username
                                }
                            });
                    }).catch(err => {
                        res.status(500).json({
                            status: 500,
                            response: err.message
                        });
                    });
            }
        }
    });

    router.post('/login', (req, res) => {
        if(req.body.username && req.body.password) {
            config.services.UserServices.authorize(req.body.username, req.body.password)
                .then(response => {
                    if(response !== null)
                        res.status(200).json({
                            status: 200,
                            response: {
                                id: response.id,
                                username: response.username
                            }
                        });
                    else 
                        res.status(401).json({
                            status: 405,
                            response: 'Unauthorized'
                        });
                }).catch(err => {
                    res.status(401).json({
                        status: 401,
                        response: err
                    });
                });
        } else {
            res.status(400).json({
                status: 400,
                response: 'Missing credentials'
            });
        }
    });

    return router;
};