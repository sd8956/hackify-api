require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'SECRET',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '365d',
  s3SecretAccesKey: process.env.S3_SECRET_ACCESS_KEY,
  s3AccesKeyId: process.env.S3_ACCESS_KEY_ID,
  s3Bucket: process.env.S3_BUCKET
}

module.exports = config;