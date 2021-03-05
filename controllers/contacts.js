const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
    try {
        const userId = req.user.id
        console.log('userId', userId)
        const data = await Contacts.getAll(userId)
        return res.json({
            status: 'success',
            code: 200,
            data: data,
        })
    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {
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
}

const add = async (req, res, next) => {
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
}

const remove = async (req, res, next) => {
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
}

const update = async (req, res, next) => {
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
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
}
