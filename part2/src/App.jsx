import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const handleSubmission = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
    };

    // Check if name already in phonebook
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`"${newName}" already in phonebook`);
    } else {
      setPersons(persons.concat(personObj));
    }

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmission}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
};

export default App;
