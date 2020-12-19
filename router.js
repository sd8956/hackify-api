const express = require('express')
const authRoutes = require('./routes/Auth')
const userRoutes = require('./routes/User')
const coachRoutes = require('./routes/Coach')
const imageRoutes = require('./routes/Image')
const cohortRoutes = require('./routes/Cohort')
const studentRoutes = require('./routes/Student')

module.exports = (app) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    res.json({
      message: 'Welcome to our api',
    });
  });

  app.use(apiRoutes)

  // Auth routes
  authRoutes(app)

  // User routes
  userRoutes(app)

  // Student routes
  studentRoutes(app)

  // Coach routes
  coachRoutes(app)

  // Image Routes
  imageRoutes(app);

  // ohort Routes
  cohortRoutes(app)
}