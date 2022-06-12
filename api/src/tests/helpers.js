const { app } = require('../index')
const supertest = require('supertest')
const Cattle = require('../models/cattle')

const api = supertest(app)

const initialCattle = [
  {
    idSenasa: 'sffsdhj453ed4rhm',
    animalType: 'toro',
    weight: 130,
    name: 'Fede',
    device: 'caravana',
    deviceNumber: '1235sd78',
  },
  {
    idSenasa: 'sdfry4610dfg68dr',
    animalType: 'toro',
    weight: 110,
    name: 'Pepe',
    device: 'caravana',
    deviceNumber: 'dasg234',
  },
  {
    idSenasa: '123d5rtg8agbd456',
    animalType: 'toro',
    weight: 123,
    name: 'Hernan',
    device: 'caravana',
    deviceNumber: '12345s7s',
  },
  {
    idSenasa: '123d5rtg8agbd456',
    animalType: 'toro',
    weight: 123,
    name: 'Hernan',
    device: 'caravana',
    deviceNumber: '12345s7s',
  },
]

const getCattle = async () => {
  const response = await api.get('/api/cattle')
  return {
    idSenasa: response.body.map(cattle => cattle.idSenasa),
    response,
  }
}

module.exports = {
  api,
  initialCattle,
  getCattle,
}
