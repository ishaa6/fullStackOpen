const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

const generateId = () => {
    let id;
    do {
        id = Math.random() * 10000;
    } while (persons.find(person => person.id === id));
    return id;
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if (person) res.json(person);
    else res.status(404).end();
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
);
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body || !body.name || !body.number) {
        return res.status(400).json({error: 'Enter both name and number'});
    }

    if (persons.find(person => person.name === body.name)){
        return res.status(400).json({error: 'Entry already exists in phonebook'});
    }

    body.id = generateId();
    persons.push(body);
    res.status(201).end();
})

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);