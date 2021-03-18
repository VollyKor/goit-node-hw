const { contacts } = require('./data')

const getAll = jest.fn(
    (userId, { sortBy, sortByDesc, filter, limit = 5, offset = 0 }) => {
        return { contacts, total: contacts.length, limit, offset }
    },
)

const getById = jest.fn((contactId, userId) => {
    const [contact] = contacts.filter(
        el => String(el._id) === String(contactId),
    )
    return contact
})

const add = jest.fn(contactObj => {
    const newContact = { ...contactObj, _id: '604290563207180a6436ec42' }
    contacts.push(newContact)
    return newContact
})

const update = jest.fn((id, contactObj) => {
    const [contact] = contacts.filter(el => String(el._id) === String(id))

    if (contact) return { ...contact[0], ...contactObj }

    return null
})

const remove = jest.fn(id => {
    const index = contacts.findIndex(e => e._id === id)

    if (index === -1) return null

    const deletedContact = contacts.splice(index, 1)
    return deletedContact
})

module.exports = {
    getAll,
    getById,
    remove,
    add,
    update,
}
