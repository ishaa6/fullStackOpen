require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})