const morgan=require('morgan')
const express = require("express")
const app = express()

app.use(express.json())
morgan.token('custom', (req) => {
  return 'POST' === req.method ? JSON.stringify(req.body) : ' '
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :custom'
  )
)

let persons =
    [
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

const personsCount = persons.length;

const currentTime = new Date();


app.post('/api/persons', (request, response) => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0

    const person = request.body
    person.id = maxId + 1

    const existingName = persons.find(p => p.name === person.name)
    const existingNumber = persons.find(p => p.number === person.number)
    persons = persons.concat(person)

    if (existingName) {
        response.status(404).json({ error: 'Name has to be unique' })
    }
    else if (existingNumber) {
        response.status(404).json({ error: 'Number is already assigned to a name' })
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.find(person => person.id !== id)
    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info of ${personsCount} people</p>
    <p>${currentTime}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/', (request, response) => {
    response.send("<h1>Hello</h1>");
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})