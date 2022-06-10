const express = require('express')
const router = express.Router()

// Importing the cattle.js file and then using the router to create a route for the cattle.js file.
const cattle = require('./cattle')

router.use('/cattle', cattle)

module.exports = router
