const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const handleAvatar = require('../helpers/handleAvatar')

require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const reg = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Users.findByEmail(email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email is already use',
            })
        }

        const { id, name, avatar, token } = await Users.create(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id,
                email,
                name,
                avatar,
            },
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.validPassword(password)

        if (!user || !isValidPassword) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'UNAUTHORIZED',
                message: 'Invalid credentials',
            })
        }

        const id = user._id
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        await Users.updateToken(id, token)
        const { subscription, avatar } = user

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                token,
                email,
                subscription,
                avatar,
            },
        })
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        const id = req.user.id
        await Users.updateToken(id, null)
        return res.status(HttpCode.NO_CONTENT).json()
    } catch (error) {
        next(error)
    }
}

const current = async (req, res, next) => {
    const token = req.get('Authorization').slice(7)
    const { email, subscription, avatar } = await Users.findByToken(token)
    return res.status(200).json({
        email,
        subscription,
        avatar,
    })
}

const avatar = async (req, res, next) => {
    try {
        const id = req.user.id

        //static
        // ======================================
        // const avatarUrl = await handleAvatar.saveAvatarToStatic(req)

        // cloudinary
        // ========================================

        const {
            public_id: imgIdCloud,
            secure_url: avatarUrl,
        } = await handleAvatar.saveAvatarToCloud(req)

        await Users.updateAvatar(id, avatarUrl, imgIdCloud)
        return res.json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                avatarUrl,
            },
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { reg, login, logout, current, avatar }
