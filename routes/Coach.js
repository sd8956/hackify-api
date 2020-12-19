const express = require('express')
const coachController = require('../controller/Coach')
const { authenticate } = require('../middleware/auth')

function coachApi(app) {
  const coachRoutes = express.Router()
  app.use('/coaches', coachRoutes)

  // Get one coach
  coachRoutes.get('/:id', authenticate, coachController.getOne)

  // Create coach
  coachRoutes.post('/', authenticate, coachController.create)

}

module.exports = coachApi;