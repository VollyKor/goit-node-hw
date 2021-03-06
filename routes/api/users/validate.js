const Joi = require('joi')
const { HttpCode } = require('../../../helpers/Constants')

const schemaValidateUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).optional(),
})

const validateUser = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next({
            status: 400,
            message: `Email or password is wrong`,
        })
    }
    next()
}

const validateRegistration = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: 400,
            message: `Filed: ${message.replace(/"/g, '')}`,
        })
    }
    next()
}

module.exports.validateUploadAvatar = (req, res, next) => {
    if (!req.file) {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'Field Avatar is undefined',
        })
    }
    next()
}

module.exports.validateCredentials = (req, res, next) => {
    return validateUser(schemaValidateUser, req.body, next)
}
module.exports.validateRegistration = (req, res, next) => {
    return validateRegistration(schemaValidateUser, req.body, next)
}

module.exports.validateRegistration = (req, res, next) => {
    return validateRegistration(schemaValidateUser, req.body, next)
}
