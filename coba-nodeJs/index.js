// index.js
const express = require("express");
const app = express();

app.use(express.json()); // Middleware untuk parsing JSON

// Data hardcoded untuk notes
let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// 1. Mengambil semua notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// 2. Mengambil satu note berdasarkan id
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end(); // Jika tidak ditemukan, kirimkan 404
  }
}); 

// 3. Menambahkan note baru
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" }); // Validasi: cek jika content kosong
  }

  const newNote = {
    id: notes.length + 1,
    content: body.content,
    important: body.important || false,
  };

  notes = notes.concat(newNote);
  response.json(newNote);
});

// 4. Menghapus note berdasarkan id
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end(); // Status 204 artinya "no content", tidak perlu mengembalikan apa pun
});

// 5. Mengupdate (menggantikan) note berdasarkan id
app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;

  const note = notes.find((note) => note.id === id);
  if (!note) {
    return response.status(404).end();
  }

  const updatedNote = {
    ...note,
    content: body.content,
    important: body.important,
  };
  notes = notes.map((note) => (note.id !== id ? note : updatedNote));

  response.json(updatedNote);
});

// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
