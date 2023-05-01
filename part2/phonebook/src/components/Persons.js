import Headers from './headers'
import personService from '../services/personService'

const Persons = ({ persons, filterNames, deleteContact}) => {
// Filter names
  const namesToFilter = filterNames.length === 0 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))
return (
  <div>
    <Headers title="Numbers" />
    <div>
      {namesToFilter.map(person => 
        <p key={person.name}>
          {person.name} {person.number} 
          <button id={person.name} onClick={deleteContact}>delete</button>
        </p>
        
      )}
    </div>
  </div>
)
}

export default Persons