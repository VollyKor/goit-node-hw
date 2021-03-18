const { Users, userTemplate } = require('./data')
const bcrypt = require('bcryptjs')

const findByEmail = jest.fn(email => {
    const [user] = Users.filter(e => e.email === email)
    return user
})

const findById = jest.fn(id => {
    const [user] = Users.filter(e => e._id === id)
    return user
})

const findByToken = jest.fn(token => {
    const [user] = Users.filter(e => e.token === token)
    return user
})

const create = jest.fn(({ name, email, password }) => {
    const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const user = { ...userTemplate, name, email, password: pass }
    return user
})

const updateToken = jest.fn((id, token) => {
    return {}
})

const updateAvatar = jest.fn((id, avatar, imgIdCloud) => {
    return {}
})

module.exports = {
    findByEmail,
    findById,
    findByToken,
    create,
    updateToken,
    updateAvatar,
}
