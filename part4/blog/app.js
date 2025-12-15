const express = require('express')
const appRouter = require('./controllers/blogs')
const middl = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(middl.requestLogger)
app.use('/api/blogs', appRouter)

app.use(middl.unknownEndpoint)
app.use(middl.errorHandler)

module.exports = app