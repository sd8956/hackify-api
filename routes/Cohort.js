const express = require('express')
const cohortController = require('../controller/Cohort')
const { authenticate, coach } = require('../middleware/auth')

function cohortsApi(app) {
  const userRoutes = express.Router()
  app.use('/cohort', userRoutes)

  // Get all cohorts
  userRoutes.get('/', authenticate, cohortController.getAll)

  // Get one cohort
  userRoutes.get('/:id', authenticate, cohortController.getOne)

  // Create one cohort
  userRoutes.post('/', authenticate, coach, cohortController.create)
}

module.exports = cohortsApi;