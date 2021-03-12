const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { AVATARS_OF_USERS } = require('./helpers/constants')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/users')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(AVATARS_OF_USERS))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', userRouter)

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
