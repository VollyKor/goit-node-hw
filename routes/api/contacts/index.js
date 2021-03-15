const express = require('express')
const router = express.Router()
const Contacts = require('../../../controllers/contacts')
const validateContact = require('./validate')
const guard = require('../../../helpers/guard')

router
    .get('/', guard, Contacts.getAll)
    .post('/', guard, validateContact.AddContact, Contacts.add)

router
    .get('/:contactId', guard, Contacts.getById)
    .delete('/:contactId', guard, Contacts.remove)
    .patch('/:contactId', guard, validateContact.UpdateContact, Contacts.update)

module.exports = router
