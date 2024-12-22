import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Person } from "./models/persons.js";

const app = express();

// serve up dist directory on /
app.use(express.static("dist"));

app.use(express.json());

morgan.token("body", (request, _) => {
  return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status - :response-time ms :req[header] :body"));

app.use(cors());

const url = process.env.MONGODB_URI;

app.get("/info", (_, response) => {
  Person.countDocuments().then((count) => {
    const resp = `<p>Phonebook has info for ${count} people</p>
    <p>${Date()}</p>`;
    response.send(resp);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const query = Person.where({ _id: request.params.id });
  query.findOne().then((person) => response.json(person));
});

app.get("/api/persons/", (_, response) => {
  Person.find().then((persons) => {
    response.json(persons);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const query = Person.where({ _id: request.params.id });
  query.findOneAndDelete().then((person) => response.status(204).end());
});

app.post("/api/persons/", (request, response, next) => {
  Person.create({
    name: request.body.name,
    number: request.body.number,
  })
    .then((mongoResponse) => {
      response.status(200).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response) => {
  const query = Person.where({ _id: request.params.id });

  query.findOneAndUpdate(request.body).then((person) => {
    console.log("updated person: ", person);
    response.status(200).end();
  });

  return response.status(200).json({ message: "hello world" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  return response.status(400).json({ error: error.message });

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
