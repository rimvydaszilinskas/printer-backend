import bcrypt, { genSaltSync } from 'bcrypt-nodejs';

let generateHashedPassword = (password) => {
    return bcrypt.hashSync(password, genSaltSync(8));
}

let isValidPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

export default function UserServices(models) {
    const User = models.User;

    const get = (id) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: {
                    id: id
                }
            }).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const findByUsername = (username) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err.message);
            });
        });
    }

    const getAll = () => {
        return new Promise((resolve, reject) => {
            User.findAll().then(users => {
                resolve(users);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const create = (username, password) => {
        return new Promise((resolve, reject) => {
            findByUsername(username)
                .then(user => {
                    if(user)
                        reject('User already exist');
                    else {
                        var hashedPassword = generateHashedPassword(password);
        
                        User.create({
                            username: username,
                            password: hashedPassword
                        }).then(user => {
                            resolve(user);
                        }).catch(error => {
                            reject(error.message);
                        });            
                    }
                });
        });
    };

    const update = (user) => {
        return new Promise((resolve, reject) => {
            User.update({
                title: user.title,
                startDate: user.startDate,
                endDate: user.endDate
            }, {
                where: {
                    id: User.id
                }
            }).then(updated => {
                resolve(updated);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const remove = (id) => {
        return new Promise((resolve, reject) => {
            User.delete({
                where: {
                    id: id
                }
            }).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err.message);
            });
        });
    };

    const authorize = (username, password) => {
        return new Promise((resolve, reject) => {
            findByUsername(username)
                .then(user => {
                    if(user) {
                        let isValid = isValidPassword(password, user.password);
                        if(isValid) {
                            resolve(user);
                        } else {
                            resolve(null);
                        }
                    }
                    reject('No user with the username');
                }).catch(err => {
                    reject(err);
                });
        });
    }

    return { 
        get,
        findByUsername,
        getAll,
        create,
        update,
        remove,
        authorize
    };
}