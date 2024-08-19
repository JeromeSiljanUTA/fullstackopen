import { useState, useEffect } from "react";

import personService from "./services/persons.js";
const { getAllPersons, addPerson, delPerson } = personService;

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    getAllPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmission = (event) => {
    event.preventDefault();
    const personObj = {
      id: newName,
      name: newName,
      number: newNumber,
    };

    // Check if name already in phonebook
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`"${newName}" already in phonebook`);
    } else {
      addPerson(personObj).then((response) => {
        setPersons(persons.concat(personObj));
        console.log(response);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmission={handleSubmission}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        newFilter={newFilter}
      />
    </div>
  );
};

const Persons = ({ persons, newFilter, setPersons }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter),
  );

  const deleteOnClick = (person) => {
    delPerson(person.id).then((response) => {
      setPersons(persons.filter((x) => x.id != person.id));
    });
  };

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}{" "}
          <button onClick={() => deleteOnClick(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filter shown with
      <input
        value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmission,
}) => {
  return (
    <form onSubmit={handleSubmission}>
      <table>
        <tbody>
          <tr>
            <th>name:</th>
            <th>
              <input
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </th>
          </tr>
          <tr>
            <th>phone number:</th>
            <th>
              <input
                value={newNumber}
                onChange={(event) => setNewNumber(event.target.value)}
              />
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default App;
