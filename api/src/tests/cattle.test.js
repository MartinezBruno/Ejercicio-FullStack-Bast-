// /* eslint-disable no-unused-expressions */

const mongoose = require('mongoose')
const { server } = require('../index')

const Cattle = require('../models/cattle')

const { api, initialCattle, getCattle } = require('./helpers')

beforeEach(async () => {
  await Cattle.deleteMany()

  for (let cattle of initialCattle) {
    const newCattle = new Cattle(cattle)
    await newCattle.save()
  }
})

//Unit test for /api/cattle
describe('GET all animals', () => {
  it('cattle are returned as json', async () => {
    await api
      .get('/api/cattle')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  it('there are 3 cattles in the database', async () => {
    const response = await api.get('/api/cattle')
    expect(response.body).toHaveLength(initialCattle.length)
  })
  it('the first cattle has the correct name', async () => {
    const response = await api.get('/api/cattle')
    expect(response.body[0].name).toBe(initialCattle[0].name)
  })
})

describe('POST an animal', () => {
  it('a new animal can be added', async () => {
    const newCattle = {
      idSenasa: 'sdfru4610dfg68dr',
      animalType: 'toro',
      weight: 130,
      name: 'Jose',
      device: 'collar',
      deviceNumber: 'oei562',
    }
    await api
      .post('/api/cattle')
      .send(newCattle)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, idSenasa } = await getCattle()

    expect(response.body).toHaveLength(initialCattle.length + 1)
    expect(idSenasa).toContain(newCattle.idSenasa)
  })
  it('is not possible with invalid data', async () => {
    const newCattle = {
      idSenasa: '123d5rtg8adtrdtrgbd456', //invalid idSenasa
      animalType: 'toro',
      name: 'Jose3123',
      device: 'collar',
      deviceNumber: 'oei562',
    }
    await api.post('/api/cattle').send(newCattle).expect(400)
  })
})
describe('DELETE an animal', () => {
  it('an animal can be deleted', async () => {
    //delete the first animal taken its ID
    const { response: firstResponse } = await getCattle()
    const { body: firstCattle } = firstResponse
    const cattleToDelete = firstCattle[0]

    await api.delete(`/api/cattle/${cattleToDelete.id}`).expect(204)

    const { response: secondResponse, idSenasa } = await getCattle()

    expect(secondResponse.body).toHaveLength(initialCattle.length - 1)
    expect(idSenasa).not.toContain(cattleToDelete.idSenasa)
  })
  it('an animal that has an invalid id can not be deleted', async () => {
    await api.delete('/api/cattle/1234').expect(400)

    const { response } = await getCattle()
    expect(response.body).toHaveLength(initialCattle.length)
  })
  it('an animal that has a valid id but do not exist can not be deleted', async () => {
    const validObjectIdThatDoNotExist = '60751827152dc22ad768f442'

    await api.delete(`/api/cattle/${validObjectIdThatDoNotExist}`).expect(404)

    const { response } = await getCattle()
    expect(response.body).toHaveLength(initialCattle.length)
  })
})

afterAll(async () => {
  server.close()
  await mongoose.connection.close()
})
