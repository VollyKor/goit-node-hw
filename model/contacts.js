const express = require('express')
const router = express.Router()
const Contacts = require('./index')
const validate = require('../routes/api/validation')

router.get('/', async (req, res, next) => {
    try {
        const data = await Contacts.getAll()
        return res.json({
            status: 'success',
            code: 200,
            data: data,
        })
    } catch (e) {
        next(e)
    }
})

router.get('/:contactId', async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const contact = await Contacts.getById(contactId)

        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
            })
        }

        return res.status(404).json({
            status: 'error',
            code: 404,
            data: 'Contact not found',
        })
    } catch (e) {
        next(e)
    }
})

router.post('/', validate.AddContact, async (req, res, next) => {
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

router.delete('/:contactId', async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const isSucces = await Contacts.remove(contactId)

        if (isSucces) {
            return res.status(200).json({ message: 'contact deleted' })
        }

        return res.status(404).json({ message: 'Not Found' })
    } catch (error) {
        next(error)
    }
})

router.patch('/:contactId', async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const data = await Contacts.update(contactId, req.body)

        if (data) {
            return res.status(200).json({
                status: 'success',
                code: 200,
                data,
            })
        }

        return res.status(404).json({ message: 'Not Found' })
    } catch (error) {
        next(error)
    }
})

module.exports = router
