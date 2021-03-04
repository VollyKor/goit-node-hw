const Contact = require('./schemas/contact')

const getAll = async () => await Contact.find({})

const getById = async id => await Contact.findOne({ _id: id })

const add = async contactObj => await Contact.create(contactObj)

const remove = async id => await Contact.findByIdAndRemove({ _id: id })

const update = async (id, contactObj) => {
    return await Contact.findByIdAndUpdate(
        { _id: id },
        { ...contactObj },
        { new: true },
    )
}

module.exports = {
    getAll,
    getById,
    remove,
    add,
    update,
}
