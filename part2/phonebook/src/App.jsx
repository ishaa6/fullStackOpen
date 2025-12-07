import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        persons.map(person => <p>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App; 