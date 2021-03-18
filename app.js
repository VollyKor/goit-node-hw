const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { AVATARS_OF_USERS } = require('./helpers/constants')
// require('dotenv').config()
const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/users')

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(AVATARS_OF_USERS))

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', userRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found app' })
})

app.use((err, req, res, next) => {
    if (err.status === 400) {
        return res.status(400).json(err)
    }
    res.status(500).json({ message: err.message })
})

module.exports = app

// const msg = {
//     to: 'Vol.kor.93@gmail.com', // Change to your recipient
//     from: 'Vol.kor.93@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent or not')
//     })
//     .catch(error => {
//         console.error(error.response.body)
//     })
