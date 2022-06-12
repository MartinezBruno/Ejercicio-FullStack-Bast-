const { Schema, model } = require('mongoose')

const cattleSchema = new Schema({
  idSenasa: {
    type: String,
    maxlength: 16,
    required: true,
  },
  animalType: {
    type: String,
    enum: ['novillo', 'toro', 'vaquillona'],
    required: true,
  },
  weight: Number,
  name: {
    type: String,
    maxlength: 200,
    required: true,
  },
  device: {
    type: String,
    enum: ['collar', 'caravana'],
    required: true,
  },
  deviceNumber: {
    type: String,
    maxlength: 8,
    required: true,
  },
})

cattleSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Cattle = model('Cattle', cattleSchema)

module.exports = Cattle
