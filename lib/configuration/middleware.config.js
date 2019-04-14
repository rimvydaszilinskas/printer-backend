'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SecretOK;
function SecretOK(conf) {
    var secret = conf['application']['secret'];

    function canRegister(req, res, next) {
        var sentSecret = req.body.secret || req.query.secret;

        if (secret === sentSecret) {
            next();
        } else {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            });
        }
    }

    return canRegister;
}