const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

let morgan = require('morgan')
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

const cors = require('cors')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(person => person.id === id)

    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(contact => contact.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  let phonebookLen = phonebook.length
  const currentDate = new Date();
  const formattedDate = currentDate.toString();

  response.send(`
    <div>
      <p>Phonebook has info for ${phonebookLen} people</p>
      <p>${formattedDate}</p>
    </div>
  `)
})

app.post('/api/phonebook', (request, response) => {
  // Generate random number for id
  const randomInt = () => Math.floor(Math.random() * 100000)

  // Get the body of the request
  const body = request.body

  // Check if name or number are empty
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  // Check if name exists alreay
  if (phonebook.filter(number => number.name === body.name).length > 0) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  // New obj to be added to phonebook
  const newNumber = {
    id: randomInt(),
    number: body.number,
    name: body.name,
  }

  // Add new obj to phonebook
  phonebook = phonebook.concat(newNumber)
  response.json(newNumber)
})

// Error catching for non-used endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)