const express = require('express')
const studentController = require('../controller/Student')
const { authenticate, coach } = require('../middleware/auth')

function studentsApi(app) {
  const studentRoutes = express.Router()
  app.use('/students', studentRoutes)

  // Get filtered users
  studentRoutes.get('/', authenticate, coach, studentController.getFilteredStudents)

  // Get one student
  studentRoutes.get('/:id', authenticate, studentController.getOne)

  // Create one student
  studentRoutes.post('/', authenticate, studentController.create)

  // Update one student
  studentRoutes.put('/', authenticate, studentController.update)
}

module.exports = studentsApi;