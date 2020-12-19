const express = require('express')
const coachController = require('../controller/Coach')
const { authenticate } = require('../middleware/auth')

function coachApi(app) {
  const userRoutes = express.Router()
  app.use('/coaches', userRoutes)

  // Get one coach
  userRoutes.get('/', authenticate, coachController.getOne)

  // Create coach
  userRoutes.post('/', authenticate, coachController.create)

}

module.exports = coachApi;