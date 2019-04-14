'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UserServices;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateHashedPassword = function generateHashedPassword(password) {
    return _bcryptNodejs2.default.hashSync(password, (0, _bcryptNodejs.genSaltSync)(8));
};

var isValidPassword = function isValidPassword(password, hashedPassword) {
    return _bcryptNodejs2.default.compareSync(password, hashedPassword);
};

function UserServices(models) {
    var User = models.User;

    var get = function get(id) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                where: {
                    id: id
                }
            }).then(function (user) {
                resolve(user);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var findByUsername = function findByUsername(username) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                resolve(user);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var getAll = function getAll() {
        return new Promise(function (resolve, reject) {
            User.findAll().then(function (users) {
                resolve(users);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var create = function create(username, password) {
        return new Promise(function (resolve, reject) {
            findByUsername(username).then(function (user) {
                if (user) reject('User already exist');else {
                    var hashedPassword = generateHashedPassword(password);

                    User.create({
                        username: username,
                        password: hashedPassword
                    }).then(function (user) {
                        resolve(user);
                    }).catch(function (error) {
                        reject(error.message);
                    });
                }
            });
        });
    };

    var update = function update(user) {
        return new Promise(function (resolve, reject) {
            User.update({
                title: user.title,
                startDate: user.startDate,
                endDate: user.endDate
            }, {
                where: {
                    id: User.id
                }
            }).then(function (updated) {
                resolve(updated);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var remove = function remove(id) {
        return new Promise(function (resolve, reject) {
            User.delete({
                where: {
                    id: id
                }
            }).then(function (user) {
                resolve(user);
            }).catch(function (err) {
                reject(err.message);
            });
        });
    };

    var authorize = function authorize(username, password) {
        return new Promise(function (resolve, reject) {
            findByUsername(username).then(function (user) {
                if (user) {
                    var isValid = isValidPassword(password, user.password);
                    if (isValid) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
                reject('No user with the username');
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    return {
        get: get,
        findByUsername: findByUsername,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove,
        authorize: authorize
    };
}