const { Schema, model } = require('mongoose')
const path = require('path')
const { SUBSCRIPTION } = require('../../helpers/constants')
const bcrypt = require('bcryptjs')
const { boolean } = require('joi')
const SALT_WORK_FACTOR = 8
const userSchema = new Schema(
    {
        name: {
            type: String,
            minlength: 2,
            default: 'Guest',
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
            validate(value) {
                const re = /\S+@\S+\.\S+/
                return re.test(String(value).toLowerCase())
            },
        },
        subscription: {
            type: String,
            enum: [SUBSCRIPTION.FREE, SUBSCRIPTION.PRO, SUBSCRIPTION.PREMIUM],
            default: SUBSCRIPTION.FREE,
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        },
        token: {
            type: String,
            default: null,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verifyToken: {
            type: String,
            required: [true, 'Verify token required'],
        },
        avatar: {
            type: String,
            default: null,
        },
        imgIdCloud: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true },
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt, null)
    next()
})

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
