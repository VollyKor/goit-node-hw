const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./model/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found app' })
})

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400)
    res.json(err)
    return
  }

  res.status(500).json({ message: err.message })
})

module.exports = app
