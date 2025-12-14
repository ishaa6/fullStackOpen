const Person = require('./models/contacts');

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('dist'));

app.get('/persons', (req, res, next) => {
    Person.find({})
    .then(result => res.json(result))
    .catch(error => next(error));   
})

app.get('/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
    .then(person => {
        if (person) res.json(person);
        else res.status(404).end();
    })
    .catch(error => next(error));
})

app.get('/info', (req, res, next) => {
    const date = new Date();
    Person.countDocuments({})
    .then(count => {
        res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
    .catch(error => next(error));
})

app.delete('/persons/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(`Deleting id: ${id}`);
    Person.findByIdAndDelete(id)
    .then(() => {
        console.log('Deleted successfully');
        res.status(204).json({message: 'Deleted successfully'});
    })
    .catch(error => next(error));
});

app.post('/persons', (req, res, next) => {
    const body = req.body;
    console.log(body);

    if (!body || !body.name || !body.number) {
        return res.status(400).json({error: 'Enter both name and number'});
    }

    const person = new Person({
        name: body.name, 
        number: body.number
    });
    person.save()
    .then(() => {
        res.status(201).json(person);
    })
    .catch(error => next(error));
})

app.put('/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updatedPerson = {
        name: body.name,
        number: body.number
    }
    console.log("Updating contact:", id);
    Person.findByIdAndUpdate(
        id, updatedPerson, 
        {
            new: true,
            runValidators: true,
            context: 'query'
        }
    )
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error));
})



const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
}
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'});
    } else if (error.name === 'ValidationError'){
        return res.status(400).json({error: error.message});
    }
    next(error);
}
app.use(errorHandler);

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);