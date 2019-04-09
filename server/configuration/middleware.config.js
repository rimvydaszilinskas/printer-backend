export default function SecretOK (conf) {
    const secret = conf['application']['secret'];

    function canRegister(req, res, next) {
        const sentSecret = req.body.secret || req.query.secret;

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