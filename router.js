  
const express = require('express')
const authRoutes = require('./routes/Auth')
const userRoutes = require('./routes/User')

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
}