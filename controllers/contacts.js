const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
    try {
        const userId = req.user.id
        const data = await Contacts.getAll(userId, req.query)
        return res.json({
            status: 'success',
            code: 200,
            data,
        })
    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contactId = req.params.contactId
        const contact = await Contacts.getById(contactId, userId)

        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Contact not found',
            })
        }
    } catch (e) {
        if (e.value.length !== 24) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Invalid id',
            })
        }
        next(e)
    }
}

const add = async (req, res, next) => {
    try {
        const userId = req.user.id
        const contact = await Contacts.add({ ...req.body, owner: userId })
        return res.status(201).json({
            status: 'succes',
            code: 201,
            data: contact,
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const isSucces = await Contacts.remove(contactId)

        if (isSucces) {
            return res.status(200).json({ message: 'contact deleted' })
        }

        return res.status(404).json({ message: 'Not Found' })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const userId = req.user.id

        const data = await Contacts.update(contactId, req.body, userId)
        if (data) {
            return res.status(200).json({
                status: 'success',
                code: 200,
                data,
            })
        }

        return res.status(404).json({ message: 'Not Found' })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
}
