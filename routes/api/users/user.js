const Joi = require('joi')

const schemaValidateUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).optional(),
})

const validate = (schema, obj, next) => {
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

const validateUser = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        return next({
            status: 400,
            message: `Bad`,
        })
    }
    next()
}

module.exports.validateCredentials = (req, res, next) => {
    return validateUser(schemaValidateUser, req.body, next)
}