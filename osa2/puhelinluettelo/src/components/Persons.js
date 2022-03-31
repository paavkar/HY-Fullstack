import React, {  useState } from 'react'
import Person from '../components/Person'
import personsService from '../services/persons'


const Persons = ({persons, setPersons, setNotificationMessage }) => {
  const [newFilter, setNewFilter] = useState("")
  const [showAll, setShowAll] = useState()

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

 
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
      .remove(id)
      .then(returnedPerson => {
        
        
        setNotificationMessage(
          `Removed '${name}'`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
        setPersons(persons)
      })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>(person.name.toLowerCase().includes(newFilter.toLowerCase()) || 
    (person.number.includes(newFilter))))

  return (
    <div>
      filter shown with: <input 
        type="text"
        placeholder="Search"
        value={newFilter}
        onChange={handleFilterChange}
          />
      {personsToShow.map(person => 
        <Person deletePerson={() => deletePerson(person.id, person.name)} 
          key={person.name} name={person.name} number={person.number}
           />
      )}
    </div>
  )
}

export default Persons