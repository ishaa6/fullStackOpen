const express = require('express')
const cors = require('cors')

const loginRouter = require('./controllers/login')
const appRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const testingRouter = require('./controllers/testing')
const middl = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(cors())
app.use(middl.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs',
    middl.tokenExtractor,
    middl.userExtractor,
    appRouter
)
if (process.env.NODE_ENV === 'test'){
    app.use('/api/testing', testingRouter)
}

app.use(middl.unknownEndpoint)
app.use(middl.errorHandler)

module.exports = app