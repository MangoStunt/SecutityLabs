const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const passportMiddleware = require('./middleware/passport')
const authRoutes = require('./routes/auth')
const overviewRoutes = require('./routes/overview')
const keys = require('./config/keys')
const server = express()

mongoose
    .connect(keys.MONGO_DB_URI)
    .then(() => console.log('DB connected!'))
    .catch( err => console.log(`Error during connection to DB: ${err}`))

server.use(morgan('dev'))

server.use(passport.initialize())
passportMiddleware.call(passport)

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.use(cors())

server.use('/api/auth', authRoutes)
server.use('/api/overview', overviewRoutes)

module.exports = server;



