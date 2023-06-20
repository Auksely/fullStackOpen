import { useState } from 'react'

import Input from './components/Input'
import Button from './components/Button'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: +37064559620 }
  ])
  const [newPerson, setNewPerson] = useState(
    { name: '', number: '' }
  )
  const [search, setSearch]=useState('');
  const [filter, setFilter]=useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingName = persons.find(person => person.name === newPerson.name);
    if (existingName) {
      window.confirm(`${newPerson.name} exists`)
    }
    else {

      const addPerson = {
        name: newPerson.name,
        number: newPerson.number
      }
      console.log(addPerson)
      setPersons(persons.concat(addPerson))
      setNewPerson({ name: '', number: '' })

    }
  }

  const handleSearch=(e)=>{
    setSearch(e.target.value);
    setFilter(true);
    return filteredList;
  }
  const filteredList = persons.filter(person=>person.name.includes(search));

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name='search' value={search} onChange={handleSearch}/>
      <form onSubmit={handleSubmit}>
        <Input type='text' name='name' value={newPerson.name} onChange={onChange} />
        <Input type='text' name='number' value={newPerson.number} onChange={onChange} />
        <Button type="submit" text={"Add"} />
      </form>
      <h2>Numbers</h2>
      <List list={filter?filteredList:persons} />
    </div>
  )
}

export default App