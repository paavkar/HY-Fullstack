import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <h3>Add a new person</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons}
        setNewName={setNewName} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange}
          handlePersonChange={handlePersonChange} notificationMessage={notificationMessage}
          setNotificationMessage={setNotificationMessage} />
      <h3>Numbers</h3>
        <Persons persons={persons} setPersons={setPersons} 
        setNotificationMessage={setNotificationMessage} />
        
    </div>
  )

}

export default App