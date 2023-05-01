import Headers from './headers'

const Filter = ( props ) => {
    return (
      <div>
        
      <Headers title="Phonebook" />
        filter shown with a <input
                                value={props.filterNames}
                                onChange={props.handleFilterChange}
                          ></input>
      </div>
    )
  }
  
  export default Filter