const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// Mengambil URL dari environment variable
const url = process.env.MONGO_URI

console.log('connecting to', url)

// Membuat koneksi ke MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Definisikan skema untuk model Persons
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v) // Custom validator untuk format nomor
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It should be in the format xx-xxxxxxx or xxx-xxxxxxx.`,
    },
  },
})

// Konfigurasi toJSON agar _id diubah menjadi id dan menghapus __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Ekspor model Note
module.exports = mongoose.model('Person', personSchema)
