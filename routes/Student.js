const express = require('express')
const studentController = require('../controller/Student')
const { authenticate, coach } = require('../middleware/auth')

function studentsApi(app) {
  const userRoutes = express.Router()
  app.use('/students', userRoutes)

  // Get filtered users
  userRoutes.get('/', authenticate, coach, studentController.getFilteredStudents)

  // Get one student
  userRoutes.get('/:id', authenticate, studentController.getOne)

  // Create one student
  userRoutes.post('/', authenticate, studentController.create)

  // Update one student
  userRoutes.put('/', authenticate, studentController.update)
}

module.exports = studentsApi;