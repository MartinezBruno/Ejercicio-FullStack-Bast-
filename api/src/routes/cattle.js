const express = require('express')
const cattle = express.Router()

const { getCattle, updateAnimal, createAnimal, deleteAnimal, getById } = require('../controllers/cattle')

cattle.get('/', getCattle)

cattle.get('/:id', getById)

cattle.post('/', createAnimal)

cattle.put('/:id', updateAnimal)

cattle.delete('/:id', deleteAnimal)

module.exports = cattle
