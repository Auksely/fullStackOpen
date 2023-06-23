import { useState, useEffect } from 'react'
// import axios from 'axios'

import Input from './components/Input'
import Button from './components/Button'
import List from './components/List'

import { getAll, create, deletePerson, update } from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState(
    { name: '', number: '' }
  )
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  // const [filteredList, setFilteredList]=useState([]);

  useEffect(() => {
    getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  console.log('persons1', persons)

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(person => person.name === newPerson.name);

    if (existingPerson) {
      const existingPersonId = existingPerson.id;
      const changedNumber = { ...existingPerson, number: newPerson.number }
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace old number with the new one?`)) {
        console.log('changedNumber', changedNumber)

        update(existingPersonId, changedNumber)
          .then(changedNumber => {
            setPersons(persons.map(person => person.id !== existingPersonId ? person : changedNumber))
          })

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
      setNewPerson({ name: '', number: '' })
    }
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
        .catch(error => {
          console.log(error)
        })
    }
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
    setFilter(true);
  }
  const filteredList = persons.filter(person => person.name && person.name.includes(search));

  return (
    <div>
      <h2>Phonebook</h2>
      <Input label="Search" name='search' value={search} onChange={onSearch} />
      <form onSubmit={handleSubmit}>
        <Input label="Name" type='text' name='name' value={newPerson.name} onChange={onChange} />
        <Input label="Number" type='text' name='number' value={newPerson.number} onChange={onChange} />
        <Button type="submit" text={"Add"} />
      </form>
      <h2>Numbers</h2>
      <List list={filter ? filteredList : persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App