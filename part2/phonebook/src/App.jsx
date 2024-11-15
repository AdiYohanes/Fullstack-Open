/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        setNotificationMessage("Failed to fetch contacts from the server");
        setNotificationType("error");
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName.trim(), number: newNumber.trim() };

    personService
      .create(personObject) 
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNotificationMessage(`Added ${returnedPerson.name}`);
        setNotificationType("success");
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error.response); // Debugging
        setNotificationMessage(
          error.response?.data?.error || "Failed to add the contact."
        );
        setNotificationType("error");
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage(`Deleted ${name}`);
          setNotificationType("success");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage(
            `Failed to delete ${name}. It may have already been removed.`
          );
          setNotificationType("error");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notificationMessage} type={notificationType} />

      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
