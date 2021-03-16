const request = require('supertest')
const app = require('../app')
const fs = require('fs').promises
const cloudinary = require('cloudinary').v2
const {
    User,
    newUser,
    userWithUsedEmail,
    loginCredentials,
    invalidLoginCredentials,
    invalidToken,
} = require('../model/__mocks__/data')
require('dotenv').config

const { getFakeToken } = require('../utils/getFakeToken')
const fakeToken = getFakeToken(User._id)

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
jest.mock('cloudinary')
jest.mock('../helpers/handleAvatar.js')

describe('Test the route api/users', () => {
    describe('test unauthorized', () => {})

    describe('test  /registration', () => {
        test('shoud return 201 status for new registration', async done => {
            const res = await request(app)
                .post('/api/users/registration')
                .set('Accept', 'application/json')
                .send(newUser)
            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()
            done()
        })
        test('shoud return 400 status for wrong field', async done => {
            const res = await request(app)
                .post('/api/users/registration')
                .set('Accept', 'application/json')
                .send({ newUser, test: 1 })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('shoud return 409 status email is already in use', async done => {
            const res = await request(app)
                .post('/api/users/registration')
                .set('Accept', 'application/json')
                .send(userWithUsedEmail)

            expect(res.status).toEqual(409)
            expect(res.body).toBeDefined()
            done()
        })
    })

    describe('test  /login', () => {
        test('shoud return 200 status for success login', async done => {
            const res = await request(app)
                .post('/api/users/login')
                .set('Accept', 'application/json')
                .send(loginCredentials)
            expect(res.status).toEqual(200)
            expect(res.body.data.token).toBeDefined()
            done()
        })
        test('shoud return 400 status for wrong field', async done => {
            const res = await request(app)
                .post('/api/users/login')
                .set('Accept', 'application/json')
                .send({ ...loginCredentials, test: 1 })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('shoud return 401 status invalid credentials', async done => {
            const res = await request(app)
                .post('/api/users/login')
                .set('Accept', 'application/json')
                .send(invalidLoginCredentials)

            expect(res.status).toEqual(401)
            expect(res.body).toBeDefined()
            done()
        })
    })

    describe('test  /logout', () => {
        test('shoud return 204 status for success logout', async done => {
            const res = await request(app)
                .post('/api/users/logout')
                .set('Authorization', `Bearer ${fakeToken}`)
            expect(res.status).toEqual(204)
            done()
        })
        test('shoud return 403 status for failure logout', async done => {
            const res = await request(app)
                .post('/api/users/logout')
                .set('Authorization', `Bearer ${invalidToken}`)

            expect(res.status).toEqual(403)
            done()
        })

        test('shoud return 401 status for abscent token', async done => {
            const res = await request(app).post('/api/users/logout')
            expect(res.status).toEqual(401)
            done()
        })
    })

    describe('test /avatar', () => {
        test('should return 200 upload avatar', async done => {
            const buffer = await fs.readFile('./test/empty-user.svg')
            const res = await request(app)
                .patch('/api/users/avatars')
                .set('Authorization', `Bearer ${fakeToken}`)
                .attach('avatar', buffer, 'empty-user.svg')

            expect(res.status).toEqual(200)
            done()
        })
    })
})
