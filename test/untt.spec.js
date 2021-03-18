const fs = require('fs').promises
const createDIr = require('../utils/create-dir')

jest.mock('fs/promises')

describe('Unit test create-dir.js', () => {
    fs.mkdir = jest.fn(() => {})
    test('run func', async done => {
        fs.access = jest.fn().mockImplementation(() => Promise.resolve(true))
        await createDIr('test-unit')
        done()
    })
    test('run func', async done => {
        fs.access = jest.fn().mockImplementation(() => Promise.reject(false))
        await createDIr('test-unit')
        done()
    })
})
