const mongoose = require("mongoose")

// Define dbName, password and URL
const dbName = "phonebookApp"
const password = "mongoTest1234"
const url =
  `mongodb+srv://fullstack:${password}@cluster0.ekwitss.mongodb.net/${dbName}?retryWrites=true&w=majority`

// If just password only parameter given
if (process.argv.length === 3) {
	// Connect to server
	mongoose.connect(url)

	// Define schema of phonebook
	const phonebookSchema = new mongoose.Schema({
		name: String,
		number: String,
	})
	const Phonebook = mongoose.model("Phonebook", phonebookSchema)

	// log each entry to console
	Phonebook.find({})
		.then(result => {
			console.log("phonebook:")
			result.forEach(person => {
				console.log(person.name + " " + person.number)
			})})
		.finally(() => {
			mongoose.connection.close()
		})
}
// Add new entry to phonebook
else if (process.argv.length === 5) {
	// Obtain args
	const newName = process.argv[3]
	const newNumber = process.argv[4]
    
	// Connect to server
	mongoose.connect(url)

	// Define schema of phonebook
	const phonebookSchema = new mongoose.Schema({
		name: String,
		number: String,
	})
	const Phonebook = mongoose.model("Phonebook", phonebookSchema)

	// Create a new phonebook entry
	const newEntry = new Phonebook({
		name: newName,
		number: newNumber,
	})
	// Save object to database & close connection
	newEntry.save().then(result => {
		console.log(`added ${newName} number ${newNumber} to phonebook`)
		mongoose.connection.close()
	})
}
// Error checking
else {
	console.log("Incorrent number of arguments")
}







