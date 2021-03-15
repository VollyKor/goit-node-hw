const { AVATARS_OF_USERS } = require('../helpers/constants')
const fs = require('fs').promises
const { uploadCloud } = require('./cloudinary')
const cloudinary = require('cloudinary').v2
const path = require('path')
const Jimp = require('jimp')
const createFolderIsExist = require('../utils/create-dir')

module.exports.saveAvatarToStatic = async req => {
    const id = req.user.id
    const avatarPath = req.file.path
    const newNameFile = `${Date.now()}-${req.file.originalname}`

    const img = await Jimp.read(avatarPath)
    img.autocrop()
        .cover(
            300,
            300,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(avatarPath)

    await createFolderIsExist(path.join(AVATARS_OF_USERS, id))

    await fs.rename(avatarPath, path.join(AVATARS_OF_USERS, id, newNameFile))

    const avatarUrl = path.normalize(path.join(id, newNameAvatar))

    try {
        await fs.unlink(path.join(AVATARS_OF_USERS, req.user.avatar))
    } catch (e) {
        console.log(e.message)
    }
    return avatarUrl
}

module.exports.saveAvatarToCloud = async req => {
    const pathFile = req.file.path
    const result = await uploadCloud(pathFile, {
        folder: 'Photo',
        transformation: { width: 300, height: 300, crop: 'fill' },
    })

    cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
        console.log(err, result)
    })
    try {
        await fs.unlink(pathFile)
    } catch (e) {
        console.log('1111', e.message)
    }
    return result
}
