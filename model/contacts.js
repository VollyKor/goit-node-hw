const Contact = require('./schemas/contact')

const getAll = async (
    userId,
    { sortby, sortByDesc, filter, limit = 5, offset = 0 },
) => {
    const results = await Contact.paginate(
        { owner: userId },
        {
            limit,
            offset,
            populate: {
                path: 'owner',
                select: 'name, email -_id',
            },
        },
    )

    const { docs: contacts, totalDocs: total } = results
    return { limit, offset, contacts, total }
}

const getById = async (contactId, userId) =>
    await Contact.findOne({ _id: contactId, owner: userId }).populate({
        path: 'owner',
        select: 'name, email -_id',
    })

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
