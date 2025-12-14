const mongoose = require('mongoose');
require('dotenv').config();

const password = encodeURIComponent(process.env.DB_PASSWORD);

const url =
  `mongodb+srv://shreyaa:${password}@cluster0.watzvqj.mongodb.net/phonebook?appName=Cluster0`;

const phoneRegex = /^\d{2,3}-\d+$/;

mongoose.set('strictQuery', false);
mongoose.connect(url, {family: 4})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Error connecting to database:', err.message);
    });

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(v) {
                return phoneRegex.test(v);
            },
            message: props => `${props.value} is not a valid phone number. Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX`
        }
    }
});

module.exports = mongoose.model('Person', schema);