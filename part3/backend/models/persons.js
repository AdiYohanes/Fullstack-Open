const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Mengambil URL dari environment variable
const url = process.env.MONGO_URI;

console.log("connecting to", url);

// Membuat koneksi ke MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Definisikan skema untuk model Persons
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 5,
  },
  number: Number,
});

// Konfigurasi toJSON agar _id diubah menjadi id dan menghapus __v
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Ekspor model Note
module.exports = mongoose.model("Person", personSchema);
