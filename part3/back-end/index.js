const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Custom token for logging POST request body
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// Use Morgan for logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Define routes
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  const nameExists = persons.some((person) => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: String(persons.length + 1),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// Export the Express app as a serverless function
module.exports = (req, res) => {
  app(req, res); // This will handle the incoming request using Express
};
