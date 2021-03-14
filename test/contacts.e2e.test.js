const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config
const { User } = require('../model/__mocks__/data')
const app = require('../app')

// Fake Valid Token
// ===================================================
const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token
// ====================================================

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Test the route api/contacts', () => {
    describe('should handle get request', () => {
        test('should return 200 status for get all contacts', async done => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${User.token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts).toBeInstanceOf(Array)

            done()
        })
    })
    describe('should handle put request', () => {})
    describe('should handle patch request', () => {})
    describe('should handle delete request', () => {})
})
