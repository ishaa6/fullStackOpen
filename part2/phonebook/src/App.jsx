import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleForm = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName, number: newNumber
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newContact));
    event.target.reset();
    console.log(persons);
    setNewName('');
    setNewNumber('');
  }

  const handleInput = (event) => {
    setNewName(event.target.value);
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const filter = (event) => {
    const value = event.target.value;
    console.log("Filtering with:", value);
    setFilterText(value);
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(value.toLowerCase()) ||
      person.number.includes(value)
    );
    setPersonsToShow(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={filterText} onChange={filter}/>
      <h2>add a new</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={handleInput} required/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        personsToShow.map(person => <p>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App; 