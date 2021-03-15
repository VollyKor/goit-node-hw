require('dotenv').config
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const { User } = require('../model/__mocks__/data')

module.exports.getFakeToken = id => {
    const validToken = jwt.sign({ id }, secretKey)
    User.token = validToken
    return validToken
}
