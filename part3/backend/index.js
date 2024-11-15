require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/persons");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Rute untuk mengambil semua persons dari database (READ - GET)
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

// Rute untuk mengambil satu person berdasarkan ID (READ - GET)
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

// Rute untuk menambahkan person baru (CREATE - POST)
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => res.status(201).json(savedPerson))
    .catch((error) => next(error));
});

// Rute untuk menghapus person berdasarkan ID (DELETE)
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }
      const name = person.name;
      return Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: `Delete for ${name} successful` });
      });
    })
    .catch((error) => next(error));
});

// Rute untuk memperbarui person berdasarkan ID (UPDATE - PUT)
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  const person = { name, number };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

// Rute info untuk menampilkan jumlah total entri dan waktu saat ini
app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const currentTime = new Date();
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentTime}</p>
      `);
    })
    .catch((error) => next(error));
});

// Middleware untuk menangani error
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
