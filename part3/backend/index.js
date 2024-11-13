const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS agar frontend di port berbeda bisa mengakses API
app.use(express.json()); // Untuk parsing JSON body
app.use(morgan("tiny")); // Logging menggunakan Morgan dengan konfigurasi 'tiny'

// Data yang di-hardcode untuk buku telepon
let persons = [ 
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// 3.1 Rute untuk mengambil semua data persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// 3.2 Rute untuk menampilkan informasi jumlah entri dan waktu saat request diterima
app.get("/api/info", (req, res) => {
  const currentTime = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `);
});

// 3.3 Rute untuk mendapatkan data berdasarkan ID
app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// 3.4 Rute untuk menghapus entri berdasarkan ID
app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  persons = persons.filter((person) => person.id !== id); // Menghapus berdasarkan ID
  res.status(204).end(); // Status 204 untuk operasi sukses tanpa body
});

// 3.5 Rute untuk menambah entri baru ke buku telepon
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // Validasi input
  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  // Cek apakah nama sudah ada
  if (persons.some((person) => person.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  // Membuat ID unik dengan Math.random
  const newPerson = {
    id: String(Math.random() * 1000),
    name,
    number,
  };

  persons.push(newPerson); // Menambahkan person baru ke array
  res.status(201).json(newPerson); // Mengembalikan entri baru dengan status 201
});

// 3.6 Menambahkan error handling untuk POST (jika name atau number hilang atau sudah ada)
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // Validasi input
  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  if (persons.some((person) => person.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  // Membuat ID unik dengan Math.random
  const newPerson = {
    id: String(Math.random() * 1000),
    name,
    number,
  };

  persons.push(newPerson); // Menambahkan person baru ke array
  res.status(201).json(newPerson); // Mengembalikan entri baru dengan status 201
});

// Menjalankan server di port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
