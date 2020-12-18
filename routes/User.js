  
const express = require('express')
const userController = require('../controller/User')
const { authenticate, student, coach } = require('../middleware/auth')

function usersApi(app) {
  const userRoutes = express.Router()
  app.use('/users', userRoutes)

  // Get one user
  userRoutes.get('/', authenticate, userController.getOne)

  // Update user
  userRoutes.put('/update', authenticate, userController.update)
}

module.exports = usersApi;