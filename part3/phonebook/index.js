const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Phonebook import from MongoDB
const Phonebook = require('./models/phonebook')

// Displays the request in console
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Error catching for non-used endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Checks for wrong ID, passes error to Express if not
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

let morgan = require('morgan')
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

let phonebook = [
]

// Display all the notes
app.get('/api/phonebook', (request, response) => {
  Phonebook.find({}).then(numbers => {
    response.json(numbers)
  })
})

// Display specific entry by ID
app.get('/api/phonebook/:id', (request, response, next) => {
  // Get the id from request and search in Phonebook
  const findId = request.params.id
  Phonebook.findOne({ _id: findId  })
  .then(entry => {
    if (entry) {
      response.json(entry)
    }
  })
  // Throw if id not found
  .catch(error => next(error))
})

// Delete entry by ID
app.delete('/api/phonebook/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Display info about the phonebook application
app.get('/info', (request, response) => {

  Phonebook.countDocuments({})
    .then(count => {
      const currentDate = new Date();
      const formattedDate = currentDate.toString();

      response.send(`
        <div>
          <p>Phonebook has info for ${count} people</p>
          <p>${formattedDate}</p>
        </div>
      `)
    })
})

// Update current entry
app.put('/api/phonebook/:id', (request, response, next) => {
  // Obtain body and create new entry to overwrite current
  const body = request.body
  const newNumber = {
    number: body.number
  }
   
  // Find current note and update (new: true returns object after change)
  Phonebook.findByIdAndUpdate(request.params.id, newNumber, { new: true })
  .then(updatedEntry => {
    response.json(updatedEntry)
    })
    .catch(error => next(error))
})

// Add new person to the phonebook/ammend current entry
app.post('/api/phonebook', (request, response, next) => {
  // Get the body of the request
  const body = request.body

  // Check if name or number fields are undefined
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Phonebook ({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)