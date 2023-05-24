const Notification = ({ message }) => {
    const addedStyle = {
        color: 'green',
        fontStyle: 'bold',
        fontSize: 32,
        borderStyle: "solid",
        borderColor: "green",
        backgroundColor: "lightgrey",
        borderRadius: 10
    }
    const modifiedStyle = {
        color: 'orange',
        fontStyle: 'bold',
        fontSize: 32,
        borderStyle: "solid",
        borderColor: "orange",
        backgroundColor: "lightgrey",
        borderRadius: 10
    }
    const removedStyle = {
        color: 'red',
        fontStyle: 'bold',
        fontSize: 32,
        borderStyle: "solid",
        borderColor: "red",
        backgroundColor: "lightgrey",
        borderRadius: 10
    }
    if (message == null) {
        return null
    }
    else if (message.toLowerCase().includes("added")) {
        return (
            <div style={addedStyle}>
                {message}
            </div>
        )
    }
    else if (message.toLowerCase().includes("updated")) {
        console.log("catching")
        return (
            <div style={modifiedStyle}>
                {message}
            </div>
        )
    }
    else if (message.toLowerCase().includes("removed") || message.toLowerCase().includes("failed")) {
        return (
            <div style={removedStyle}>
                {message}
            </div>
        )
    }
    else {
        console.log("Front-end Componnent - Notification.js of bottom else")
        return null
    }
}

export default Notification