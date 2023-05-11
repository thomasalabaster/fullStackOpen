const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  // If someone is added to the server, display message
  else if (message.toLowerCase().includes("added")) {
    return (
        <div className="added">
            {message}
        </div>
    )
  }
  // Error display if somebody is 
  else if (message.includes("error")) {
    return (
        <div className="error">
            {message}
        </div>
    )
  }
  else {
        return null
  } 
}

export default Notification