const Cattle = require('../models/cattle')

// It finds all the animals in the database and sends them back to the client
// If request parameters are provided, it will search for the potreros that match the request parameters
const getCattle = (req, res) => {
  const { name } = req.query
  if (name) {
    // Add Regex to search simlar names
    Cattle.find({ name: { $regex: '.*' + name + '.*' } })
      .limit(5)
      .then(result => res.send(result))
      .catch(err => res.status(404).send(err))
  } else {
    Cattle.find({})
      .then(animals => res.send(animals))
      .catch(err => res.status(500).send({ message: err.message }))
  }
}

const getById = (req, res) => {
  const { id } = req.params
  Cattle.findById(id)
    .then(animal => res.send(animal))
    .catch(err => res.status(500).send({ message: err.message }))
}

//It creates an animal in the database with the data from the request body
const createAnimal = (req, res) => {
  const { idSenasa, animalType, weight, name, device, deviceNumber } = req.body
  Cattle.findOne({ idSenasa })
    .then(animal => {
      if (animal) {
        return res.status(400).send({ message: 'Animal already exists' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
  Cattle.findOne({ deviceNumber })
    .then(animal => {
      if (animal) {
        return res.status(400).send({ message: 'Device already exists' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
  const newAnimal = new Cattle({
    idSenasa,
    animalType,
    weight,
    name,
    device,
    deviceNumber,
  })
  newAnimal
    .save()
    .then(animal => res.status(201).send(animal))
    .catch(err => res.status(400).send({ message: err.message }))
}

// It takes the id from the request parameters, the animalType, weight, name, device, and deviceNumber
// from the request body, and then uses the id to find the animal in the database and update it with the new data
const updateAnimal = (req, res) => {
  const { id } = req.params
  const { animalType, weight, name, device, deviceNumber } = req.body
  const data = {
    animalType,
    weight,
    name,
    device,
    deviceNumber,
  }
  Cattle.findByIdAndUpdate(id, data, { new: true })
    .then(() => res.send({ message: 'Informacion actualizada' }))
    .catch(err => res.status(500).send({ message: err.message }))
}

// It finds an animal by its id and deletes it
const deleteAnimal = async (req, res) => {
  const { id } = req.params
  // Cattle.findByIdAndDelete(id)
  //   .then(animal => res.status(204).send(animal))
  //   .catch(err => {
  //   })
  try {
    const animal = await Cattle.findByIdAndDelete(id)
    if (animal === null) return res.sendStatus(404)
    return res.status(204).send(animal)
  } catch (err) {
    if (err.name === 'CastError') res.status(400).send({ error: 'id used is malformed' })
    else res.sendStatus(404)
  }
}

module.exports = {
  getCattle,
  getById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
}
