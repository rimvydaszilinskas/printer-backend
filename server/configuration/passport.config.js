import { Strategy } from 'passport-local';

export default function Passport(config, passport) {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, passowrd, done) => {
        config.services.UserServices.authorize(username, passowrd)
            .then(user => {
                if(user) {
                    return done(null, user);
                } else {
                    return done(null, null, 'Wrong credentials');
                }
            }).catch(err => {
                return done(err);
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        config.services.UserServices.get(id)
            .then(user => {
                done(null, user);
            }).catch(err => {
                done(err);
            });
    });
};
