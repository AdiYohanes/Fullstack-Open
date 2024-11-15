require('dotenv').config() // Load environment variables
const mongoose = require('mongoose')

// Pastikan password diambil dari argumen baris perintah
if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  process.exit(1)
}

const password = process.argv[2] // Password dari argumen
const url = process.env.MONGO_URI.replace('<password>', password) // Ganti placeholder password dalam URL

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Keluar jika koneksi gagal
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // Menampilkan semua entri
  Person.find({})
    .then((result) => {
      console.log('phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((error) => {
      console.error('Error fetching entries:', error.message)
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  // Menambahkan entri baru
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then(() => {
      console.log(`Added ${name} with number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((error) => {
      console.error('Error saving entry:', error.message)
      mongoose.connection.close()
    })
} else {
  console.log('Usage: node mongo.js <password> [name] [number]')
  mongoose.connection.close()
}
