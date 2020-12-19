const express = require('express')
const userController = require('../controller/User')

function AuthApi(app) {
  const authRoutes = express.Router()
  app.use('/', authRoutes)

  // Login
  authRoutes.post('/login', userController.login)

  // Register
  authRoutes.post('/register', userController.create)
}

module.exports = AuthApi;