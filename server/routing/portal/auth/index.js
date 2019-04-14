import { Router } from 'express';
import passport from 'passport';

// Route: /portal/auth
export default function AuthRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        if(req.isAuthenticated())
            res.redirect('/portal/events/');
        res.render('login');
    });

    router.post('/login', (req, res, next) => {
        console.log('login')
        passport.authenticate('local', (err, user, info) => {
            if(user){
                req.login(user, (err) => {
                    return res.redirect('/portal/printers/');
                });
            }
            else {
                console.log('err', err);
                res.redirect('/portal/auth/');
            }
        })(req, res, next);
    });

    router.get('/register', config.middleware.secured, (req, res) => {
        res.render('register');
    });

    router.post('/register', config.middleware.secured, (req, res) => {
        if(req.body.username && req.body.password) {
            if(req.body.username.length < 5 || req.body.password.length < 6) {
                res.render('register', { error: 'Credentials are too short!'});
            } else {
                config.services.UserServices.create(req.body.username, req.body.password)
                    .then(user => {
                        if(user){
                            res.render('register', { user: user });
                        }
                    }).catch(err => {
                        res.render('register', {error: err});
                    });
            }
        } else {
            res.render('register', { error: 'No credentials supplied.'});
        }
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/portal/auth/');
    });

    return router;
};