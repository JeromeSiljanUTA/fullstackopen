import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Person } from "./models/persons.js";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request, _) => {
  return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status - :response-time ms :req[header] :body"));

app.use(cors());

const url = process.env.MONGODB_URI;

let persons = [];

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
    Person.find().then((persons) => {
      response.json(persons);
    });
  } else {
    response.json(persons.find((person) => person.id == request.params.id));
  }
});

app.get("/api/persons/", (_, response) => {
  Person.find().then((persons) => {
    response.json(persons);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  console.log("please remove person with id", request.params.id);
  const query = Person.where({ _id: request.params.id });
  query.findOneAndDelete().then((persons) => response.status(204).end());
});

app.post("/api/persons/", (request, response) => {
  if (!request.body.name) {
    response.status(400).json({ error: "missing name" });
  } else if (!request.body.number) {
    response.status(400).json({ error: "missing number" });
  } else if (persons.find((person) => person.name === request.body.name)) {
    response.status(400).json({ error: "name already in phonebook" });
  } else {
    // persons = [
    //   ...persons,
    //   {
    //     id: Math.floor(Math.random() * 10000).toString(),
    //     name: request.body.name,
    //     number: request.body.number,
    //   },
    // ];

    response.status(200).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
