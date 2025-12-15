require('dotenv').config()

const PORT = process.env.PORT 
const MONGODB_URI = process.env.DB_URI

module.exports = {
  PORT,
  MONGODB_URI,
}