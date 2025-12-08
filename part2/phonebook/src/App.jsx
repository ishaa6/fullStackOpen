import { useState, useEffect } from "react";
import service from './services/contacts'

const Filter = ({filterText, handleFilterChange}) => (
  <div>
    filter shown with
    <input value={filterText} onChange={handleFilterChange}/>
  </div>
);

const Notification = ({message, type}) => {
  const style = {
    color: type === 'success'? 'green' : 'red',
    border: `2px solid ${type === 'success'?'green':'red'}`
  }

  if (!message) return null;
  return (
    <div className="noti" style={style}>{message}</div>
  )
}

const PersonForm = ({handleForm, newName, newNumber, handleInput, handleNumber}) => {
  return(
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
  )
}

const App = () => {
  useEffect(() => {
    service
      .getData()
      .then(response => {
        setPersons(response);
        setPersonsToShow(response);
      })
      .catch(error => {
        setNotificationType('error');
        showNotification("Error loading data");
      })
  }, [])

  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  const handleForm = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName, number: newNumber
    }
    if (persons.some(person => person.name === newName)){
      const confirmation = window.confirm(`${newName} is already added to phoenbook, replace the old number with a new one?`);
      if (!confirmation) {
        setNewName('');
        setNewNumber('');
        return;
      }
      let contact = persons.find(person => person.name === newName);
      contact = {...contact, number: newNumber}
      service
        .updateData(contact)
        .then (() => {
          setPersons(persons.map(person => person.id === contact.id ? contact:person));
          setPersonsToShow(personsToShow.map(person => person.id === contact.id ? contact:person));
          setNewName('');
          setNewNumber('');
          setNotificationType('success');
          showNotification(`Updated ${contact.name}`);
        })
        .catch(error => {
          setNotificationType('error');
          showNotification(`Information of ${contact.name} has already been removed from server`);
        })
      return;
    }
    service
      .postData(newContact)
      .then(response => {
        const updatedPersons = persons.concat(response);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
        setFilterText('');
        event.target.reset();
        setNewName('');
        setNewNumber('');
        setNotificationType('success');
        showNotification(`Added ${newContact.name}`);
    })
    .catch(error => {
      setNotificationType('error');
      showNotification(`Information of ${contact.name} has already been removed from server`);
    })
  }

  const handleInput = (event) => {
    setNewName(event.target.value);
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const filter = (event) => {
    const value = event.target.value;
    setFilterText(value);
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(value.toLowerCase()) ||
      person.number.includes(value)
    );
    setPersonsToShow(filtered);
  }

  const handleDelete = (id, name) => {
    const confirmation = window.confirm(`Delete ${name} ?`);
    if (!confirmation) return;
    service
      .deleteData(id)
      .then(() => {
        setPersons(persons.filter(person=> person.id!=id));
        setPersonsToShow(personsToShow.filter(persons=> persons.id!=id));
        setNotificationType('success');
        showNotification(`Deleted ${name}`);
      })
      .catch(error => {
        setNotificationType('error');
        showNotification(`Information of ${name} has already been removed from server`);
      })
  }

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      <Filter filterText={filterText} handleFilterChange={filter}/>
      <h3>add a new</h3>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} handleInput={handleInput} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      {
        personsToShow.map(person => 
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </div>
      )
      }
    </div>
  )
}

export default App; 