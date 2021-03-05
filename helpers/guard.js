const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./Constants')

const guard = (req, res, next) => {
    if (req.get('Authorization') === undefined) {
        res.status(HttpCode.FORBIDDEN).json({
            status: 'error',
            code: HttpCode.FORBIDDEN,
            data: 'Forbidden',
            message: 'token is abscent',
        })
    }
    passport.authenticate('jwt', { session: false }, (err, user) => {
        console.log(req.get('Authorization'))
        const [, token] = req.get('Authorization').split(' ')
        if (!user || err || token !== user.token) {
            return res.status(HttpCode.FORBIDDEN).json({
                status: 'error',
                code: HttpCode.FORBIDDEN,
                data: 'Forbidden',
                message: 'Access is denied',
            })
        }
        req.user = user
        return next()
    })(req, res, next)
}

module.exports = guard
