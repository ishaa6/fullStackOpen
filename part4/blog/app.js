const express = require('express')
const loginRouter = require('./controllers/login')
const appRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const middl = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(middl.requestLogger)
app.use(middl.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', appRouter)
app.use('/api/users', userRouter)

app.use(middl.unknownEndpoint)
app.use(middl.errorHandler)

module.exports = app