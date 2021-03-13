const express = require('express')
const router = express.Router()
const validateUser = require('./validate')

const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.post(
    '/registration',
    validateUser.validateRegistration,
    userController.reg,
)
router.post('/login', validateUser.validateCredentials, userController.login)
router.post('/logout', guard, userController.logout)
router.get('/current', guard, userController.current)
router.patch(
    '/avatars',
    [guard, upload.single('avatar'), validateUser.validateUploadAvatar],
    userController.avatar,
)

module.exports = router
