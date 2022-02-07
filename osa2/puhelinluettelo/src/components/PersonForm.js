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
      window.confirm(`${props.newName} is already added to phonebook. Would you like to change the number?`)
      personsService
      .update(id)
      .then(returnedPerson => {
        props.setNotificationMessage(
          `Changed '${props.name} number'`
        )
        setTimeout(() => {
          props.setNotificationMessage(null)
        }, 3000)
        props.setPersons(props.persons)
      })
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
        .catch(error => {
          props.setNotificationMessage(`'${error.response.data.error}'`)
          setTimeout(() => {
            props.setNotificationMessage(null)
          }, 3000)
          console.log(error.response.data)
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