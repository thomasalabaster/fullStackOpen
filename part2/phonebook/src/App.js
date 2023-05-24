import { useEffect, useState } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import Persons from './components/Persons'  
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [messageContent, setMessage] = useState(null)

  // Populates the persons 
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Deletes contact
  const deleteContact = (event) => {
    event.preventDefault()
    const id = event.target.id
    const toBeDeleted = persons.find(person => person.name === id)
    if (window.confirm(`Delete ${toBeDeleted.name}? `)) {
      personService
      .deletePersons(toBeDeleted.id)
      .then(() => {
        personService
        
          .getAll()
          .then(response => {
            setPersons(response.data)
            setMessage(`${toBeDeleted.name} removed from database`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)

          })
      })
    }
  }

  // Adds contact
  const addContact = (event) => {
    event.preventDefault()
    // Update number if contact already exists
    const toBeUpdatedID = persons.find(person => 
      person.name === newName)?.id
    if (toBeUpdatedID) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one? `)) 
      {
        personService
        .update(toBeUpdatedID,
          { name: newName,
          number: newNumber })
        .then(response => {
            personService
              .getAll()
              .then(response => {
                setMessage(`${newName}'s number has been successfully updated`)
                setTimeout(() => {
                  setMessage(null)
                }, 3000)
                setPersons(response.data)
              });
        })
        .catch(error => {
          console.log("Error updating user", error)
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
        
        setNewName("")
        setNewNumber("")
        return
      }
      else {
        // Clear fields and return if user rejects change
        setNewName("")
        setNewNumber("")
        return
      }
    }

    // Error checking
    if (newNumber === "" || newName === "") {
      alert("Enter a name or number")
      return
    }

    // Add a new person
    const newEntry = { name: newName,
                        number: newNumber}
    personService
      .create(newEntry)
      .then(response => {
        // Add temporary message showing who was added
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)

        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        // Display reason for error
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleFilterChange = (event) => {
    setFilterNames(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification message={messageContent} />
      <Filter filterNames={filterNames} handleFilterChange={handleFilterChange} />
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} />
      <Persons persons={persons} filterNames={filterNames} deleteContact={deleteContact} />
    </div>
  )
}

export default App