import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Input from './components/Input'
import Button from './components/Button'
import List from './components/List'

import { getAll, create, deletePerson, update } from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  }

  const existingPerson = persons.find(person => person.name === newPerson.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingPerson) {
      const existingPersonId = existingPerson.id;
      const changedNumber = { ...existingPerson, number: newPerson.number }
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with the new one?`)) {

        update(existingPersonId, changedNumber)
          .then(changedNumber => {
            setPersons(persons.map(person => person.id !== existingPersonId ? person : changedNumber))
          })
          .catch(error => {
            alert(
              `${existingPerson.name} was already deleted from server`
            )
            setPersons(persons.filter(person => person.id !== existingPersonId))
          })

        setNotification(
          `${existingPerson.name} number was changed to ${changedNumber.number}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)

      }
    }

    else {
      const addPerson = {
        name: newPerson.name,
        number: newPerson.number
      }
      create(addPerson)
        .then(returnedPerson =>
          setPersons(persons.concat(returnedPerson)))

      setNotification(
        `${newPerson.name} is added to the phonebook`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
    setNewPerson({ name: '', number: '' })

  }


  const handleDelete = id => {
    const findPerson = persons.find(person => person.id === id);
    const name = findPerson.name;
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
        .then(() => {
          getAll()
            .then(initialNotes => {
              setPersons(initialNotes)
            })
        })
    }
  }


  const onSearch = (e) => {
    setSearch(e.target.value);
    setFilter(true);
  }
  const filteredList = persons.filter(person => person.name && person.name.includes(search));


    getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })

  return (
    <div>
      <h2>Phonebook</h2>
      <Input label="Search" name='search' value={search} onChange={onSearch} />
      <form onSubmit={handleSubmit}>
        <Input label="Name" type='text' name='name' value={newPerson.name} onChange={onChange} />
        <Input label="Number" type='text' name='number' value={newPerson.number} onChange={onChange} />
        <Button type="submit" text={"Add"} />
      </form>
      <Notification message={notification} />
      <h2>Numbers</h2>
      <List list={filter ? filteredList : persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App