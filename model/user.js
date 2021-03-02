const express = require('express')
const router = express.Router()
const Contacts = require('./index')
const validateUser = require('../routes/api/users/user')

router.post('/', validateUser.AddContact, async (req, res, next) => {
    try {
        const contact = await Contacts.add(req.body)
        return res.status(201).json({
            status: 'succes',
            code: 201,
            data: contact,
        })
    } catch (error) {
        next(error)
    }
})
