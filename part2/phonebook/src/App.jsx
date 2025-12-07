import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('');

  const handleForm = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newContact));
    event.target.reset();
    console.log(persons);
    setNewName('');
  }

  const handleInput = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p>{person.name}</p>)
      }
    </div>
  )
}

export default App; 