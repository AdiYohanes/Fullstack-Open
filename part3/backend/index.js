const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware untuk CORS, parsing JSON, dan logging
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Data yang di-hardcode untuk buku telepon
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Rute untuk mengambil semua data persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Rute untuk menampilkan informasi jumlah entri dan waktu saat request diterima
app.get("/api/info", (req, res) => {
  const currentTime = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `);
});

// Rute untuk mendapatkan data berdasarkan ID
app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  person
    ? res.json(person)
    : res.status(404).json({ error: "Person not found" });
});

// Rute untuk menghapus entri berdasarkan ID
app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end(); // Status 204 untuk operasi sukses tanpa body
});

// Rute untuk menambah entri baru ke buku telepon
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(400).json({ error: "name and number are required" });
  if (persons.some((person) => person.name === name))
    return res.status(400).json({ error: "name must be unique" });

  const newPerson = { id: String(Math.random() * 1000), name, number };
  persons.push(newPerson);
  res.status(201).json(newPerson); // Mengembalikan entri baru dengan status 201
});

// Export handler untuk digunakan di Vercel
module.exports = app;
