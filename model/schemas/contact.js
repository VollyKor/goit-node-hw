const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

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
        owner: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
        },
    },
    { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)
module.exports = Contact
