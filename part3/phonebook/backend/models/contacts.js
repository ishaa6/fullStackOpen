const mongoose = require('mongoose');
require('dotenv').config();

const password = encodeURIComponent(process.env.DB_PASSWORD);

const url =
  `mongodb+srv://shreyaa:${password}@cluster0.watzvqj.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, {family: 4})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Error connecting to database:', err.message);
    });

const schema = new mongoose.Schema({
    name: String,
    number: String
});

module.exports = mongoose.model('Person', schema);