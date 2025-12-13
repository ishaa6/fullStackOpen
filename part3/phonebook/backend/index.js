const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('dist'));

const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide database password as an argument');
    process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://shreyaa:${password}@cluster0.watzvqj.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, {family: 4});

if (!mongoose.connection) {
    console.log('Error connecting to database');
    process.exit(1);
}

const schema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', schema);

app.get('/persons', (req, res) => {
    Person.find({}).then(result => res.json(result))
})

app.get('/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person) res.json(person);
        else res.status(404).end();
    })
})

app.get('/info', (req, res) => {
    const date = new Date();
    Person.countDocuments({}).then(count => {
        res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    });
})

app.delete('/persons/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Deleting id: ${id}`);
    Person.findByIdAndDelete(id).then(() => {
        console.log('Deleted successfully');
        res.status(204).json({message: 'Deleted successfully'});
    })
});

app.post('/persons', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body || !body.name || !body.number) {
        return res.status(400).json({error: 'Enter both name and number'});
    }

    const person = new Person({
        name: body.name, 
        number: body.number
    });
    person.save().then(() => {
        res.status(201).json(person);
    })
})

app.put('/persons/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedPerson = {
        name: body.name,
        number: body.number
    }
    console.log("Updating contact:", id);
    Person.findByIdAndUpdate(id, updatedPerson, {new: true})
        .then(result => {
            res.json(result);
        });
})

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);