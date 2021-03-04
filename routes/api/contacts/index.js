const express = require('express')
const router = express.Router()
const Contacts = require('../../../controllers/contacts')
const validateContact = require('./validate')

router.get('/', Contacts.getAll)

router.get('/:contactId', Contacts.getById)

router.post('/', validateContact.AddContact, Contacts.add)

router.delete('/:contactId', Contacts.remove)

router.patch('/:contactId', Contacts.update)

module.exports = router
