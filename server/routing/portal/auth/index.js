import { Router } from 'express';

// Route: /portal/auth
export default function AuthRouting(config) {
    const router = Router();

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', (req, res) => {
        config.services.UserServices.authorize(req.body.username, req.body.password)
            .then(user => {
                if(user){
                    req.session.user = user;
                    res.send('authorized')
                } else 
                    res.redirect('/portal/auth/login');
            }).catch(err => {
                res.redirect('/portal/auth/login')
            });
    });

    return router;
};