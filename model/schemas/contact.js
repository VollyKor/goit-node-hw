const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: [true, 'Set email for contact'],
        },
        phone: {
            type: String,
            required: [true, 'Set phone for contact'],
            unique: true,
        },

        date: { type: Date, default: () => Date.now() },

        // subscription: {
        //     type: String,
        //     enum: [SUBSCRIPTION.FREE, SUBSCRIPTION.PRO, SUBSCRIPTION.PREMIUM],
        //     default: SUBSCRIPTION.FREE,
        // },
        // password: {
        //     type: String,
        //     default: 'password',
        // },
        // token: {
        //     type: String,
        //     default: '',
        // },
    },
    { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)
module.exports = Contact
