const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const handleAvatar = require('../helpers/handleAvatar')
const { nanoid } = require('nanoid')

require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET
const EmailService = require('../services/email')

const reg = async (req, res, next) => {
    try {
        const { email, name } = req.body
        const user = await Users.findByEmail(email)
        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email is already use',
            })
        }

        const verifyToken = nanoid()
        const emailService = new EmailService(process.env.NODE_ENV)
        await emailService.sendEmail(verifyToken, email, name)

        const { id, avatar } = await Users.create({ ...req.body, verifyToken })
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
        console.log(e.body)
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.validPassword(password)

        if (!user.verify) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                data: 'UNAUTHORIZED',
                message: "Email isn't verifyed",
            })
        }

        if (!user || !isValidPassword || !user.verify) {
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

const verify = async (req, res, next) => {
    try {
        const user = await Users.findByVerifyToken(req.params.token)
        if (user) {
            await Users.updateVerifyToken(user.id, true, null)
            return res.json({
                status: 'success',
                code: HttpCode.OK,
                message: 'Verification successful!',
            })
        }
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'Link is not valid',
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { reg, login, logout, current, avatar, verify }
