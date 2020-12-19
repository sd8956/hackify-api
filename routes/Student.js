const express = require('express')
const studentController = require('../controller/Student')
const { authenticate } = require('../middleware/auth')

function studentsApi(app) {
  const userRoutes = express.Router()
  app.use('/students', userRoutes)

  // Get one student
  userRoutes.get('/:id', authenticate, studentController.getOne)

  // Create one student
  userRoutes.post('/', authenticate, studentController.create)

  // Update one student
  userRoutes.put('/', authenticate, studentController.update)
}

module.exports = studentsApi;