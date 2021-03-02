const mongoose = require('mongoose')
const { Schema, model } = mongoose
const SUBSCRIPTION = require('../../helpers/Constants')

const contactSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
            validate(value) {
                const re = /\S+@\S+\.\S+/
                return re.test(String(value).toLowerCase())
            },
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        },
        token: {
            type: String,
            default: null,
        },
        subscription: {
            type: String,
            enum: [SUBSCRIPTION.FREE, SUBSCRIPTION.PRO, SUBSCRIPTION.PREMIUM],
            default: SUBSCRIPTION.FREE,
        },
        owner: {
            type: SchemasTypes.ObjectId,
            ref: 'user',
        },
    },
    { versionKey: false, timestamps: true },
)

module.exports = contactSchema
