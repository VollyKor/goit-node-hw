const request = require('supertest')
const app = require('../app')
require('dotenv').config
const {
    User,
    contacts,
    wrongId,
    newContact,
} = require('../model/__mocks__/data')
const { getFakeToken } = require('../utils/getFakeToken')

const fakeToken = getFakeToken(User._id)
const contactId = contacts[0]._id

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Test the route api/contacts', () => {
    describe('should handle get request', () => {
        test('should return 200 status for get all contacts', async done => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts).toBeInstanceOf(Array)

            done()
        })
        test('should return 200 status for find by id contact', async done => {
            const res = await request(app)
                .get(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data).toHaveProperty('_id')
            expect(res.body.data._id).toBe(contactId)

            done()
        })

        test('should return 404 status for wrong id contact', async done => {
            const res = await request(app)
                .get(`/api/contacts/${wrongId}`)
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            expect(res.body.data).toBeDefined()

            done()
        })
        test('should return 404 status for invalid id contact', async done => {
            const res = await request(app)
                .get(`/api/contacts/${wrongId}1`)
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            expect(res.body.data).toBeDefined()

            done()
        })
    })
    describe('should handle post request', () => {
        test('should return 201 for add contact', async () => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send(newContact)

            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()

            newContactId = res.body.data._id
        })

        test('should return 400 status for wrong field', async done => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send({ ...newContact, field: 1 })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })

        test('should return 400 status without required field phone', async done => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send({ name: 'zxc', email: 'zxc@gmail.com' })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })

        test('should return 400 status without required field name', async done => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send({ phone: '123-123-123', email: 'zxc@gmail.com' })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })

        test('should return 400 status without required field phone', async done => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send({ name: 'zxc', email: 'zxc@gmail.com' })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('should handle patch request', () => {
        test('should return 200 status for updated contact', async done => {
            const res = await request(app)
                .patch(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${fakeToken}`)
                .set('Accept', 'application/json')
                .send({ name: 'gfh' })

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            done()
        })

        test('should return 404 status for wrong id contact', async done => {
            const res = await request(app)
                .patch(`/api/contacts/${wrongId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${fakeToken}`)
                .send({ name: 'gfh' })
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })

        test('should return 400 status for wrong field', async done => {
            const res = await request(app)
                .patch(`/api/contacts/${contactId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${fakeToken}`)
                .send({ test: 'gfh' })
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('should handle delete request', () => {
        test('should return 200 status for delete contact', async done => {
            const res = await request(app)
                .delete(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 404 status for not found contact', async done => {
            const res = await request(app)
                .delete(`/api/contacts/${wrongId}`)
                .set('Authorization', `Bearer ${fakeToken}`)

            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
    })
})
