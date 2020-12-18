  
const express = require('express')
const userController = require('../controller/User')

function usersApi(app) {
  const authRoutes = express.Router()
  app.use('/', authRoutes)

  // Login
  authRoutes.post('/login', userController.login)

  // Register
  authRoutes.post('/register', userController.create)
}

module.exports = usersApi;