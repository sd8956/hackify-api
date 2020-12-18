require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'SECRET',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '365d'
}

module.exports = config;