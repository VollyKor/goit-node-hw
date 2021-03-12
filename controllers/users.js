const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode, AVATARS_OF_USERS } = require('../helpers/constants')
const {
    UPLOAD_FOLDER,
    PUBLIC_FOLDER,
    PUBLIC_IMAGES_FOLDER,
} = require('../helpers/constants')
const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const createFolderIsExist = require('../helpers/create-dir')
const User = require('../model/schemas/user')

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

        const newUser = await Users.create(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
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
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json()
}

const current = async (req, res, next) => {
    const token = req.get('Authorization').slice(7)
    const user = await Users.findByToken(token)
    console.log(user)
    return res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    })
}

const avatar = async (req, res, next) => {
    try {
        const id = req.user.id
        const avatarPath = req.file.path
        const newNameFile = `${Date.now()}-${file.originalName}`
        const img = await Jimp.read(avatarPath)

        img.autocrop()
            .cover(
                300,
                300,
                Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
            )
            .writeAsync(avatarPath)

        await createFolderIsExist(path.join(PUBLIC_IMAGES_FOLDER, id))
        await fs.rename(
            avatarPath,
            path.join(PUBLIC_IMAGES_FOLDER, id, newNameFile),
        )

        const avatarUrl = path.normalize(path.join(id, newNameFile))

        try {
            await fs.unlink(AVATARS_OF_USERS, req.user.avatar)
        } catch (e) {
            console.log(e.message)
        }

        await Users.updateAvatar(id, avatarUrl)

        return res.status(200).json({
            status: 'success',
            code: HttpCode.OK,
            data: { avatarUrl },
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { reg, login, logout, current, avatar }
