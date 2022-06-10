const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/index')

const app = express()

app.name = 'API'
app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app.use('/api', routes)

// Error catching endware.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  // eslint-disable-next-line no-console
  console.error(err)
  res.status(status).send(message)
})

module.exports = app
