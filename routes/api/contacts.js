const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: "method get '/'" })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'method get"/:contactId"' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'method post' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'method delete' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'method patch' })
})

module.exports = router
