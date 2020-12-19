const express = require('express')
const aplicationController = require('../controller/Aplication')
const { authenticate } = require('../middleware/auth')

function AplicationApi(app) {
  const aplicationRoutes = express.Router()
  app.use('/aplications', aplicationRoutes)

  // Get aplication by userId
  aplicationRoutes.get('/', authenticate, aplicationController.getByUserId)

  // Get aplication by id
  aplicationRoutes.get('/:id', authenticate, aplicationController.getOne)

  // Create aplication
  aplicationRoutes.post('/', authenticate, aplicationController.create)

  // Update aplication
  aplicationRoutes.put('/:id', authenticate, aplicationController.update)
}

module.exports = AplicationApi;