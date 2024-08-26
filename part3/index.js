const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_, response) => {
  response.send("<h1>Ollo</h1>");
});

app.get("/info", (_, response) => {
  const resp = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`;
  response.send(resp);
});

app.get("/api/persons/:id", (request, response) => {
  if (!request.params.id) {
    response.json(persons);
  } else {
    console.log(persons);
    response.json(persons.find((person) => person.id == request.params.id));
  }
});

app.get("/api/persons/", (_, response) => {
  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  persons = persons.filter((person) => person.id !== request.params.id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  if (!request.body.name) {
    response.status(400).json({ error: "missing name" });
  } else if (!request.body.number) {
    response.status(400).json({ error: "missing number" });
  } else if (persons.find((person) => person.name === request.body.name)) {
    response.status(400).json({ error: "name already in phonebook" });
  } else {
    persons = [
      ...persons,
      {
        id: Math.floor(Math.random() * 10000),
        name: request.body.name,
        number: request.body.number,
      },
    ];

    console.log(persons);
    response.status(200).end();
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
