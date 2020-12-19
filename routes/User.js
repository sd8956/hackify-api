const express = require('express')
const userController = require('../controller/User')
const { authenticate } = require('../middleware/auth')

function usersApi(app) {
  const userRoutes = express.Router()
  app.use('/users', userRoutes)

  // Get one user
  userRoutes.get('/', authenticate, userController.getOne)

  // Update user
  userRoutes.put('/', authenticate, userController.update)

  userRoutes.get('/coaches', authenticate, userController.getAllCoach)
}

module.exports = usersApi;