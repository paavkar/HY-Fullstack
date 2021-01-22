import React from 'react'
import personsService from '../services/persons'

const PersonForm = (props) => {

  const addPerson = (event, id) => {
    event.preventDefault()
    
    const personObject = {
      name: props.newName,
      number: props.newNumber,
      id: props.persons.length + 1,
    }
    
    if(props.persons.find(element => element.name === props.newName)) {
      window.alert(`${props.newName} is already added to phonebook`)
      props.setNewName('')
      props.setNewNumber('')
    }
    else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(personObject))
          props.setNewName('')
          props.setNewNumber('')
          
          props.setNotificationMessage(
            `Added '${personObject.name}'`
          )
          setTimeout(() => {
            props.setNotificationMessage(null)
          }, 3000)
        })
          
    }
  }

return (
  <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handlePersonChange} 
                />
        </div>
        <div>
          number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)}


export default PersonForm