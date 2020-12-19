const express = require('express')
const cohortController = require('../controller/Cohort')
const { authenticate, coach } = require('../middleware/auth')

function cohortsApi(app) {
  const cohortRoutes = express.Router()
  app.use('/cohort', cohortRoutes)

  // Get all cohorts
  cohortRoutes.get('/', authenticate, cohortController.getAll)

  // Get one cohort
  cohortRoutes.get('/:id', authenticate, cohortController.getOne)

  // Create one cohort
  cohortRoutes.post('/', authenticate, coach, cohortController.create)
}

module.exports = cohortsApi;